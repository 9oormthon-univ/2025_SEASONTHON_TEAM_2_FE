import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookshelfBg from "../../assets/icons/Bookshelf_bg.svg";
import { BookIcon } from "../../assets/icons/home";
import axiosInstance from "../../api/axiosInstance";
import moment from "moment";

type Entry = { id: number; question: string; answer?: string };

type MyBookshelfDTO = {
    userId: number;
    nickname: string;
    lastUpdatedAt: string;
    items: { questionId: number; questionText: string; answer?: string }[];
};

type UpdateAnswersDTO = {
    items: { questionId: number; answer: string }[];
};

const saveAnswersToServer = async ({ items }: UpdateAnswersDTO): Promise<void> => {
    await axiosInstance.patch('/api/bookshelf/bookshelf/me', { items });
};

const getMyBookshelf = async (): Promise<MyBookshelfDTO> => {
    const res = await axiosInstance.get<{ data: MyBookshelfDTO }>('/api/bookshelf/me').then(r => r.data);
    return res.data;
};

const getBookshelfByUserId = async (userId: number): Promise<MyBookshelfDTO> => {
    const res = await axiosInstance.get<{ data: MyBookshelfDTO }>(`/api/bookshelf/${userId}`).then(r => r.data);
    return res.data;
};

const fmt = (iso?: string) => {
    if (!iso) return "-";
    return moment(new Date(iso)).format("YYYY-MM-DD HH:MM:SS");
};
const nowIso = () => new Date().toISOString();

export default function FamilyBookshelfDetailPage() {
    const { bookId } = useParams();
    const navigate = useNavigate();

    const [owner, setOwner] = useState<string>("가족");
    const [savedAt, setSavedAt] = useState<string>("-");
    const [entries, setEntries] = useState<Entry[]>([]);
    const [notFound, setNotFound] = useState(false);

    const [myUserId, setMyUserId] = useState<number | null>(null);
    const [isEditable, setIsEditable] = useState(false);

    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const dirtyRef = useRef(false);
    const savingRef = useRef(false);

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

            try {
                const me = await getMyBookshelf();
                if (!mounted) return;
                setMyUserId(me.userId);
            } catch { /* ignore */ }

            if (bookId === "me") {
                try {
                    const data = await getMyBookshelf();
                    if (!mounted) return;
                    setOwner(data.nickname || "나");
                    setSavedAt(fmt(data.lastUpdatedAt));
                    setEntries(toEntries(data));
                    setIsEditable(true);
                    setNotFound(false);
                } catch {
                    if (!mounted) return;
                    setOwner("나");
                    setEntries([]);
                    setIsEditable(true);
                    setSavedAt("-");
                    setNotFound(false);
                }
                return;
            }

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
                setEntries(toEntries(data));

                if (myUserId && idNum === myUserId) {
                    setIsEditable(true);
                } else {
                    setIsEditable(false);
                }
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

        return () => { mounted = false; };
    }, [bookId, myUserId]);

    const doServerSave = async () => {
        if (!isEditable || !dirtyRef.current || savingRef.current) {
            return;
        }
        try {
            savingRef.current = true;
            setSaving(true);
            setSaveError(null);

            const payload: UpdateAnswersDTO = {
                items: entries.map(e => ({
                    questionId: e.id,
                    answer: (e.answer ?? "").trim(),
                })),
            };

            await saveAnswersToServer(payload);

            setSavedAt(fmt(nowIso()));
            dirtyRef.current = false;
        } catch {
            setSaveError("자동 저장에 실패했어요. 네트워크를 확인해 주세요.");
        } finally {
            savingRef.current = false;
            setSaving(false);
        }
    };

    // 3초마다 자동 저장 (서버로)
    useEffect(() => {
        if (!isEditable) return;
        const iv = setInterval(() => {
            void doServerSave();
        }, 3000);
        return () => clearInterval(iv);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditable, entries, myUserId]);

    const updateAnswer = (id: number, val: string) => {
        setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, answer: val } : e)));
        dirtyRef.current = true;
        setSaveError(null);
    };

    const handleClose = async () => {
        if (isEditable) {
            await doServerSave();
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
                                        className={`ml-3 text-xs font-pretendard ${saving ? "text-[#4C505C]" : saveError ? "text-red-500" : "text-[#7A7A7A]"
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
