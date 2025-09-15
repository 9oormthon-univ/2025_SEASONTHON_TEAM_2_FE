import { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
    getBookshelfByUserId,
    getMyBookshelf,
    saveAnswersToServer,
    type UpdateAnswersDTO,
} from "../../api/bookshelf";

type Entry = { id: number; question: string; answer?: string };

const fmt = (iso?: string) =>
    iso ? moment(new Date(iso)).format("YYYY.MM.DD HH:mm") : "-";
const nowIso = () => new Date().toISOString();

export default function LargeMobileFamilyBookshelfDetail({ bookId }: { bookId: string }) {
    const [owner, setOwner] = useState("가족");
    const [savedAt, setSavedAt] = useState("-");
    const [entries, setEntries] = useState<Entry[]>([]);
    const [isEditable, setIsEditable] = useState(false);

    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const dirtyRef = useRef(false);
    const savingRef = useRef(false);

    useEffect(() => {
        const load = async () => {
            try {
                const me = await getMyBookshelf();
                const targetId = bookId === "me" ? me.userId : Number(bookId);
                const isMyBookshelf = targetId === me.userId;

                setIsEditable(isMyBookshelf);

                const data = isMyBookshelf
                    ? await getMyBookshelf()
                    : await getBookshelfByUserId(targetId);

                setOwner(data.nickname || (isMyBookshelf ? "나" : "가족"));
                setSavedAt(fmt(data.lastUpdatedAt));
                setEntries(
                    (data.items ?? []).map((it) => ({
                        id: it.questionId,
                        question: it.questionText,
                        answer: it.answer ?? "",
                    }))
                );
            } catch (err) {
                console.error("큰화면 책장 로드 실패:", err);
            }
        };
        load();
    }, [bookId]);

    const doServerSave = async () => {
        if (!isEditable || !dirtyRef.current || savingRef.current) return;
        try {
            savingRef.current = true;
            setSaving(true);
            setSaveError(null);

            const payload: UpdateAnswersDTO = {
                items: entries.map((e) => ({
                    questionId: e.id,
                    answer: (e.answer ?? "").trim(),
                })),
            };

            await saveAnswersToServer(payload);
            setSavedAt(fmt(nowIso()));
            dirtyRef.current = false;
        } catch {
            setSaveError("자동 저장 실패");
        } finally {
            savingRef.current = false;
            setSaving(false);
        }
    };

    useEffect(() => {
        if (!isEditable) return;
        const iv = setInterval(() => {
            void doServerSave();
        }, 3000);
        return () => clearInterval(iv);
    }, [isEditable, entries]);

    const updateAnswer = (id: number, val: string) => {
        setEntries((prev) =>
            prev.map((e) => (e.id === id ? { ...e, answer: val } : e))
        );
        dirtyRef.current = true;
        setSaveError(null);
    };

    return (
        <div className="flex flex-col gap-2 py-6">
            <div className="flex items-center gap-2">
                <h2 className="font-pretendard text-[22px] font-semibold text-[#577297]">
                    {owner}의 책
                </h2>
                <span className="text-[18px] text-light-gray">
                    {savedAt}
                </span>
                {isEditable && (
                    <span className="text-[18px] text-gray-400">
                        {saving
                            ? "자동 저장 중..."
                            : saveError
                                ? saveError
                                : dirtyRef.current
                                    ? "변경 사항 있음"
                                    : "저장됨"}
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-4 my-2 rounded-2xl rounded-tl-none border-8 border-[#BAD7FF] bg-white">
                {entries.length === 0 ? (
                    <div className="rounded-xl bg-white p-4 text-center text-gray-400">
                        아직 답변이 없습니다.
                    </div>
                ) : (
                    entries.map((it) => (
                        <div
                            key={it.id}
                            className="rounded-xl p-4"
                        >
                            <p className="text-[20px] font-semibold mb-2">
                                {it.id}. {it.question}
                            </p>
                            {isEditable ? (
                                <input
                                    value={it.answer ?? ""}
                                    onChange={(e) => updateAnswer(it.id, e.target.value)}
                                    placeholder="답변을 입력해 보세요"
                                    className="w-full h-[60px] rounded-lg bg-gray-100 p-3 text-[#4C505C] text-[18px] focus:outline-none"
                                />
                            ) : (
                                <div className="rounded-lg bg-gray-100 h-[60px] flex items-center px-3 text-[18px] text-[#4C505C]">
                                    {it.answer && it.answer.trim()
                                        ? it.answer
                                        : "아직 답변하지 않았어요"}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
