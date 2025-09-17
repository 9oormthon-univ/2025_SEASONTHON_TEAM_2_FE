import { useEffect, useRef, useState } from "react";
import moment from "moment";
import LoadingSpinner from "../LoadingSpinner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { diffDay } from "../../lib/util";
import { getCurrentTopic, getAnswers, answerCurrentTopic } from "../../api/home/topics";
import { useAuthStore } from "../../store/auth";

type Answer = {
    answerId: number;
    content: string;
    respondedAt: string;
    nickname: string;
    topicId: number;
    userId: number;
    profileUrl: string;
};

function AnswerRow({ a }: {
    a: Answer;
    isMine: boolean;
    onDelete?: (id: number) => void;
}) {
    return (
        <article className="bg-white p-3">
            <div className="flex items-center gap-2 mb-2">
                <img src={a.profileUrl} className="h-8 w-8 rounded-full object-cover" />
                <div className="font-bold">{a.nickname}</div>
                <div className="text-[#E4572E] text-[12px] ml-2">
                    {moment(a.respondedAt).format("YYYY.MM.DD. HH:mm")}
                </div>

            </div>

            <div className="rounded-lg bg-back-color px-3 py-2 text-[16px]">A. {a.content}</div>
        </article>
    );
}

export default function MobileTodaysQuestion() {
    const qc = useQueryClient();
    const { user } = useAuthStore();
    const myUserId = user?.userId;

    const [isWriting, setIsWriting] = useState(false);
    const [text, setText] = useState("");
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    const {
        data: currentTopic,
        isLoading: topicLoading,
        isError: topicError,
    } = useQuery({
        queryKey: ["current-topics"],
        queryFn: getCurrentTopic,
    });

    const {
        data: answers,
        isLoading: answerLoading,
    } = useQuery<Answer[]>({
        queryKey: ["answerData", currentTopic?.id],
        queryFn: () => getAnswers(currentTopic!.id),
        enabled: !!currentTopic?.id,
    });

    const hasMyAnswer = !!(answers && myUserId && answers.some((a) => a.userId === myUserId));

    const createMut = useMutation({
        mutationFn: (payload: { topicId: number; content: string }) =>
            answerCurrentTopic(payload.topicId, payload.content),
        onSuccess: async () => {
            setText("");
            setIsWriting(false);
            await qc.invalidateQueries({ queryKey: ["answerData", currentTopic?.id] });
        },
    });

    useEffect(() => {
        if (isWriting) inputRef.current?.focus();
    }, [isWriting]);

    const handleSubmit = () => {
        if (!currentTopic || !text.trim()) return;
        createMut.mutate({ topicId: currentTopic.id, content: text.trim() });
    };

    const remaining = currentTopic ? diffDay(currentTopic.activeUntil) : "";

    return (
        <section>
            {/* 제목 + 남은일수 */}
            <div className="flex items-center gap-2 px-1 mb-2">
                <h2 className="font-semibold text-[18px]">오늘의 질문</h2>
                {topicLoading ? (
                    <span className="text-[#8E9AA6] text-[12px]">로딩중…</span>
                ) : topicError ? (
                    <span className="text-[#E4572E] text-[12px]">불러오기 실패</span>
                ) : (
                    <span className="text-[#E4572E] text-[14px]">{remaining}</span>
                )}
            </div>

            <div className="rounded-2xl rounded-tl-none bg-white p-4">
                {/* 질문 본문 */}
                <div className="mb-4">
                    {topicLoading ? (
                        <p className="text-black text-base animate-pulse">질문을 불러오는 중…</p>
                    ) : (
                        <p className="text-black text-[17px]">Q. {currentTopic?.question ?? "질문이 없습니다"}</p>
                    )}
                </div>

                {!isWriting && !hasMyAnswer && (
                    <button
                        onClick={() => setIsWriting(true)}
                        className="w-full h-10 rounded-xl font-semibold text-[16px] bg-primary-200 text-white mb-4"
                    >
                        답변하기
                    </button>
                )}

                {isWriting && (
                    <div className="mb-4">
                        <textarea
                            ref={inputRef}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => {
                                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }}
                            placeholder="답변을 입력해주세요"
                            rows={2}
                            className="w-full p-3 text-[17px] rounded-lg bg-back-color focus:outline-none"
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={handleSubmit}
                                disabled={createMut.isPending || !text.trim()}
                                className="flex-1 h-11 rounded-lg bg-primary-200 text-white font-semibold disabled:opacity-50"
                            >
                                {createMut.isPending ? "제출 중…" : "제출하기"}
                            </button>
                            <button
                                onClick={() => {
                                    setIsWriting(false);
                                    setText("");
                                }}
                                className="h-11 px-4 rounded-lg bg-[#E9ECEF] font-medium"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                )}

                <hr className="border-t border-light-gray my-4" />

                {/* 답변 리스트 */}
                {answerLoading ? (
                    <LoadingSpinner size={48} text="답변 불러오는 중" />
                ) : (answers?.length ?? 0) === 0 ? (
                    <p className="text-center text-[#8E9AA6] text-sm">아직 답변이 없어요.</p>
                ) : (
                    <div className="space-y-3 max-h-[45vh] overflow-y-auto">
                        {answers!.map((a) => (
                            <AnswerRow
                                key={a.answerId}
                                a={a}
                                isMine={!!myUserId && a.userId === myUserId}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
