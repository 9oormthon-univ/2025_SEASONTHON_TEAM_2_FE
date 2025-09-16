import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { diffDay } from "../../lib/util";
import { getCurrentTopic, getAnswers, answerCurrentTopic } from "../../api/home/topics";
import { useAuthStore } from "../../store/auth";

type Answer = {
    answerId: number;
    content: string;
    createdAt: string;
    nickname: string;
    topicId: number;
    userId: number;
    profileUrl: string;
};

function AnswerRowLarge({ a }: { a: Answer }) {
    return (
        <article className="rounded-xl  px-4 py-3">
            <div className="flex items-center gap-3">
                <img src={a.profileUrl} className="h-15 w-15 rounded-full object-cover" />
                <div className="min-w-0">
                    <div className="font-semibold text-[22px]">{a.nickname}</div>
                    <div className="font-normal mt-1 py-3 text-[20px] leading-[1.3]">
                        A. {a.content}
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function LargeMobileTodaysQuestion() {
    const qc = useQueryClient();
    const { user } = useAuthStore();
    const myUserId = user?.userId;

    const [isWriting, setIsWriting] = useState(false);
    const [text, setText] = useState("");
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    const { data: currentTopic, isLoading: topicLoading, isError: topicError } = useQuery({
        queryKey: ["current-topics"],
        queryFn: getCurrentTopic,
    });

    const { data: answers, isLoading: answerLoading } = useQuery<Answer[]>({
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
            <div className="flex items-center gap-2 px-1 mb-4">
                <h2 className="text-[25px] font-semibold text-[#A98A49]">오늘의 질문</h2>
                {topicLoading ? (
                    <span className="text-[#8E9AA6] text-[20px]">로딩중…</span>
                ) : topicError ? (
                    <span className="text-[#E4572E] text-[20px]">불러오기 실패</span>
                ) : (
                    <span className="text-[#E4572E] text-[18px]">{remaining}</span>
                )}
            </div>

            <div className="rounded-2xl rounded-tl-none border-8 border-[#FFE7B7] bg-white p-4 pb-20">
                <div className="mb-3">
                    {topicLoading ? (
                        <p className="text-black text-[22px] animate-pulse">질문을 불러오는 중…</p>
                    ) : (
                        <p className="text-black text-[22px] font-semibold p-2">
                            Q. {currentTopic?.question ?? "질문이 없습니다"}
                        </p>
                    )}
                </div>

                {isWriting && (
                    <div className="mb-3">
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
                            rows={2}
                            className="w-full p-4 text-[22px] rounded-xl bg-back-color focus:outline-none" />
                    </div>
                )}

                {!hasMyAnswer && (
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => (isWriting ? handleSubmit() : setIsWriting(true))}
                            disabled={createMut.isPending || (isWriting && !text.trim())}
                            className="flex-1 h-14 rounded-xl bg-[#FFE7B7] text-[#A98A49] text-[25px] font-semibold"
                        >
                            {isWriting ? (createMut.isPending ? "제출 중…" : "답변하기") : "답변하기"}
                        </button>

                        {isWriting && (
                            <button
                                onClick={() => {
                                    setIsWriting(false);
                                    setText("");
                                }}
                                className="h-14 px-8 rounded-xl bg-back-color font-semibold text-[25px] text-gray-600"
                            >
                                취소
                            </button>
                        )}
                    </div>
                )}


                <hr className="border-t border-[#F3D49B]/60 my-4" />

                {answerLoading ? (
                    <LoadingSpinner size={48} text="답변 불러오는 중" />
                ) : (answers?.length ?? 0) === 0 ? (
                    <p className="text-center text-[#8E9AA6] text-[16px]">아직 답변이 없어요.</p>
                ) : (
                    <div className="space-y-3 max-h-[50vh] overflow-y-auto">
                        {answers!.map((a) => (
                            <AnswerRowLarge key={a.answerId} a={a} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
