import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BookshelfBg from "../../assets/icons/Bookshelf_bg.svg";
import { BookIcon } from "../../assets/icons/home";

type Entry = { id: number; question: string; answer?: string };

type MyBookshelfDTO = {
    userId: number;
    nickname: string;
    lastUpdatedAt: string;
    items: { questionId: number; questionText: string; answer?: string }[];
};

const getMyBookshelf = async (): Promise<MyBookshelfDTO> => {
    const token = localStorage.getItem("access_token");
    const resp = await axios
        .get<{ data: MyBookshelfDTO }>(`${import.meta.env.VITE_API_URL}/api/bookshelf/me`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((r) => r.data);
    return resp.data;
};

const getBookshelfByUserId = async (userId: number): Promise<MyBookshelfDTO> => {
    const token = localStorage.getItem("access_token");
    const resp = await axios
        .get<{ data: MyBookshelfDTO }>(`${import.meta.env.VITE_API_URL}/api/bookshelf/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((r) => r.data);
    return resp.data;
};

/** ==== LocalStorage ==== */
type LocalBook = { savedAt: string; answers: Record<number, string> };
const LS_KEY = (userId: number | null) => `bookshelf:me:${userId ?? "unknown"}`;

const loadLocal = (userId: number | null): LocalBook | null => {
    try {
        const raw = localStorage.getItem(LS_KEY(userId));
        return raw ? (JSON.parse(raw) as LocalBook) : null;
    } catch {
        return null;
    }
};
const saveLocal = (userId: number | null, data: LocalBook) => {
    try {
        localStorage.setItem(LS_KEY(userId), JSON.stringify(data));
    } catch {
        /* ignore quota */
    }
};

const fmt = (iso?: string) => {
    if (!iso) return "-";
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(
        d.getMinutes()
    )}:${pad(d.getSeconds())}`;
};
const nowIso = () => new Date().toISOString();

export default function FamilyBookshelfDetailPage() {
    const { bookId } = useParams();
    const navigate = useNavigate();

    const [owner, setOwner] = useState<string>("가족");
    const [savedAt, setSavedAt] = useState<string>("-");
    const [entries, setEntries] = useState<Entry[]>([]);
    const [notFound, setNotFound] = useState(false);

    // 내 정보(편집 가능 여부 판정에 사용)
    const [myUserId, setMyUserId] = useState<number | null>(null);
    const [isEditable, setIsEditable] = useState(false);

    // autosave
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const dirtyRef = useRef(false);
    const savingRef = useRef(false);

    // 초기 로딩
    useEffect(() => {
        let mounted = true;

        const toEntries = (data: MyBookshelfDTO): Entry[] =>
            (data.items ?? []).map((it) => ({
                id: it.questionId,
                question: it.questionText,
                answer: it.answer ?? "",
            }));

        const load = async () => {
            if (!bookId) {
                setNotFound(true);
                return;
            }

            // 내 userId 먼저 확보 (편집 가능 판단에 필요)
            try {
                const me = await getMyBookshelf();
                if (!mounted) return;
                setMyUserId(me.userId);
            } catch {
                // 무시 (비로그인 등)
            }

            // me or others
            if (bookId === "me") {
                try {
                    const data = await getMyBookshelf();
                    if (!mounted) return;
                    setOwner(data.nickname || "나");

                    // 로컬 병합
                    let base = toEntries(data);
                    const local = loadLocal(data.userId);
                    if (local?.answers) {
                        base = base.map((e) => ({ ...e, answer: local.answers[e.id] ?? e.answer ?? "" }));
                        setSavedAt(fmt(local.savedAt));
                    } else {
                        setSavedAt(fmt(data.lastUpdatedAt));
                    }

                    setEntries(base);
                    setIsEditable(true);
                    setNotFound(false);
                } catch {
                    if (!mounted) return;
                    setOwner("나");
                    setEntries([]);
                    setIsEditable(true); // me는 편집 가능
                    setSavedAt("-");
                    setNotFound(false);
                }
                return;
            }

            // 숫자 id 접근
            const idNum = Number(bookId);
            if (Number.isNaN(idNum)) {
                setNotFound(true);
                return;
            }

            try {
                const data = await getBookshelfByUserId(idNum);
                if (!mounted) return;
                setOwner(data.nickname || "가족");
                setSavedAt(fmt(data.lastUpdatedAt));

                let base = toEntries(data);

                // 만약 숫자 id가 내 userId와 같다면(홈 타일에서 본인 클릭) -> 편집 가능 + 로컬 병합
                if (myUserId && idNum === myUserId) {
                    const local = loadLocal(myUserId);
                    if (local?.answers) {
                        base = base.map((e) => ({ ...e, answer: local.answers[e.id] ?? e.answer ?? "" }));
                        setSavedAt(fmt(local.savedAt));
                    }
                    setIsEditable(true);
                } else {
                    setIsEditable(false);
                }

                setEntries(base);
                setNotFound(false);
            } catch {
                if (!mounted) return;
                setOwner("가족");
                setSavedAt("-");
                setEntries([]);
                setIsEditable(false);
                setNotFound(false);
            }
        };

        load();

        dirtyRef.current = false;
        setSaveError(null);

        return () => {
            mounted = false;
        };
    }, [bookId, myUserId]);

    /** 로컬 저장 (3초 주기 + 닫기 버튼 시 강제 호출) */
    const doLocalSave = async () => {
        if (!isEditable) return;
        if (!dirtyRef.current && !savingRef.current) {
            // 변경 없음
            return;
        }
        try {
            savingRef.current = true;
            setSaving(true);
            setSaveError(null);

            const answers: Record<number, string> = {};
            for (const e of entries) answers[e.id] = (e.answer ?? "").trim();

            const ts = nowIso();
            saveLocal(myUserId, { savedAt: ts, answers });

            setSavedAt(fmt(ts));
            dirtyRef.current = false;
        } catch {
            setSaveError("자동 저장에 실패했어요. 저장 공간을 확인해 주세요.");
        } finally {
            savingRef.current = false;
            setSaving(false);
        }
    };

    // 3초마다 자동 저장
    useEffect(() => {
        if (!isEditable) return;
        const iv = setInterval(() => {
            void doLocalSave();
        }, 3000);
        return () => clearInterval(iv);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditable, entries, myUserId]);

    // 페이지 이탈 시 마지막 저장
    useEffect(() => {
        if (!isEditable) return;
        const handler = () => {
            if (dirtyRef.current && !savingRef.current) {
                const answers: Record<number, string> = {};
                for (const e of entries) answers[e.id] = (e.answer ?? "").trim();
                const ts = nowIso();
                try {
                    saveLocal(myUserId, { savedAt: ts, answers });
                } catch {
                    /* ignore */
                }
            }
        };
        window.addEventListener("beforeunload", handler);
        return () => window.removeEventListener("beforeunload", handler);
    }, [isEditable, entries, myUserId]);

    const updateAnswer = (id: number, val: string) => {
        setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, answer: val } : e)));
        dirtyRef.current = true;
        setSaveError(null);
    };

    const handleClose = async () => {
        // 닫기 시 즉시 저장 + 저장 시간 갱신
        if (isEditable) {
            await doLocalSave();
        }
        navigate("/home", { replace: true });
    };

    if (notFound) {
        return (
            <div className="w-full p-6 rounded-2xl bg-white border border-light-gray">
                해당 책장을 찾을 수 없어요.
                <button
                    onClick={() => navigate(-1)}
                    className="ml-3 h-8 px-3 rounded-lg bg-primary-200 text-white hover:opacity-90"
                >
                    돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="w-full h-[740px]">
            <div className="relative w-full h-full bg-transparent overflow-hidden">
                <img src={BookshelfBg} alt="" className="absolute w-full h-full object-cover z-10 pointer-events-none" />
                <div className="absolute inset-6 bg-[#EFF1F0] m-2 rounded-2xl overflow-hidden flex flex-col z-[9999]">
                    <div className="px-6 pt-6 pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <img src={BookIcon} alt="" className="w-7 h-7" />
                                <h2 className="font-kccganpan text-[24px] text-[#49684A]">{owner}의 책</h2>
                                <span className="font-pretendard ml-2 text-sm text-light-gray">저장 시간 : {savedAt}</span>
                                {isEditable && (
                                    <span
                                        className={`ml-3 text-xs font-pretendard ${
                                            saving ? "text-[#4C505C]" : saveError ? "text-red-500" : "text-[#7A7A7A]"
                                        }`}
                                    >
                    {saving
                        ? "자동 저장 중..."
                        : saveError
                            ? saveError
                            : dirtyRef.current
                                ? "변경 사항 있음 (자동 저장 대기)"
                                : "모든 변경 사항이 저장됨"}
                  </span>
                                )}
                            </div>
                            <button
                                onClick={handleClose}
                                className="h-8 px-4 rounded-lg bg-primary-200 text-white font-pretendard hover:opacity-90"
                            >
                                닫기
                            </button>
                        </div>
                    </div>

                    <div className="px-6 pb-6 flex-1 overflow-y-auto">
                        {entries.length === 0 ? (
                            <div className="rounded-2xl bg-white p-5 text-[#7A7A7A]">
                                {isEditable ? "아직 질문이 없거나 데이터를 불러오지 못했어요." : "아직 답변이 없습니다."}
                            </div>
                        ) : (
                            entries.map((it) => (
                                <div key={it.id} className="mb-5 rounded-2xl bg-white p-5">
                                    <p className="font-kccganpan text-[22px] text-[#49684A] mb-3">
                                        {it.id}. {it.question}
                                    </p>

                                    {isEditable ? (
                                        <textarea
                                            value={it.answer ?? ""}
                                            onChange={(e) => updateAnswer(it.id, e.target.value)}
                                            placeholder="여기에 답변을 입력해 보세요"
                                            className="w-full rounded-2xl bg-[#EFF1F0] min-h-[96px] p-4 text-[#4C505C] font-gangwon text-[30px] outline-none focus:ring-2 focus:ring-primary-200 resize-y"
                                        />
                                    ) : (
                                        <div className="rounded-2xl bg-[#EFF1F0] min-h-[64px] flex items-center px-4 text-[#4C505C] font-gangwon text-[26px]">
                                            {it.answer && it.answer.trim() ? it.answer : "아직 답변하지 않았어요"}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
