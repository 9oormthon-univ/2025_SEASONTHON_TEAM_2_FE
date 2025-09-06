import React, { useMemo, useState } from "react";
import { QMark } from "../../assets/icons/home";
import type { QuestionAnswer } from "../../types";

export type PastQuestionItem = {
    id: number;
    question: string;
    answers: QuestionAnswer[];
};

type Props = {
    data: PastQuestionItem[];
    onClose: () => void;
};

const PAGE_SIZE = 10;

const AnswerRow: React.FC<{ a: QuestionAnswer }> = ({ a }) => (
    <div className="px-4 py-3 rounded-2xl bg-white">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="size-8 bg-dark-gray rounded-full" />
                <p className="font-kccganpan text-primary-300 text-lg">{a.author}</p>
                <span className="font-kccganpan text-point-color-orange text-xs">{a.timestamp}</span>
            </div>
        </div>
        <div className="mt-2 bg-[#EFF1F0] rounded-2xl px-3 py-2">
            <p className="font-gangwon text-dark-gray text-2xl">A. {a.answer}</p>
        </div>
    </div>
);

export default function PastQuestion({ data, onClose }: Props) {
    const [page, setPage] = useState(1);
    const [openId, setOpenId] = useState<number | null>(null);

    const totalPages = Math.max(1, Math.ceil((data?.length ?? 0) / PAGE_SIZE));
    const list = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return (data ?? []).slice(start, start + PAGE_SIZE);
    }, [data, page]);

    const toggle = (id: number) => setOpenId((cur) => (cur === id ? null : id));

    return (
        <div className="flex flex-col flex-1 min-h-0">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={QMark} alt="" className="size-8" />
                    <p className="font-kccganpan text-primary-300 text-[24px]">지난 질문 보기</p>
                </div>
                <button
                    onClick={onClose}
                    className="font-pretendard w-[44px] h-[31px] bg-primary-200 text-white rounded-lg text-[16px]"
                >
                    닫기
                </button>
            </div>

            <div className="mt-4 flex-1 min-h-0 overflow-y-auto space-y-4 pr-1">
                {list.map((q) => {
                    const opened = openId === q.id;
                    return (
                        <div
                            key={q.id}
                            className={`rounded-2xl bg-[#EFF1F0] ${opened ? "p-5" : "p-4"} overflow-hidden transition-all`}
                        >
                            <button
                                type="button"
                                onClick={() => toggle(q.id)}
                                className="w-full flex items-center gap-3 text-left"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    className={`transition-transform ${opened ? "rotate-90" : ""}`}
                                    aria-hidden
                                >
                                    <path d="M8 5l8 7-8 7V5z" fill="#49684A" />
                                </svg>
                                <span className="font-gangwon text-[28px] text-black">
                  Q. {q.question}
                </span>
                            </button>

                            {opened && (
                                <div className="mt-4 pl-8 space-y-3">
                                    {q.answers && q.answers.length > 0 ? (
                                        q.answers.map((a) => <AnswerRow key={a.id} a={a} />)
                                    ) : (
                                        <div className="px-4 py-6 rounded-2xl bg-white border border-[#E2E8E0] text-center text-[#6B7280]">
                                            아직 답변이 없어요
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-3 flex items-center justify-center gap-3">
                <button
                    onClick={() => {
                        setOpenId(null);
                        setPage((p) => Math.max(1, p - 1));
                    }}
                    disabled={page === 1}
                    className="font-pretendard h-[31px] px-3 bg-primary-200 text-white rounded-lg disabled:opacity-40 text-[16px]"
                >
                    이전
                </button>
                <span className="font-pretendard text-sm text-[#6B7280]">
          {page} / {totalPages}
        </span>
                <button
                    onClick={() => {
                        setOpenId(null);
                        setPage((p) => Math.min(totalPages, p + 1));
                    }}
                    disabled={page === totalPages}
                    className="font-pretendard h-[31px] px-3 bg-primary-200 text-white rounded-lg disabled:opacity-40 text-[16px]"
                >
                    다음
                </button>
            </div>
        </div>
    );
}
