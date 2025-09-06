import { useMemo, useState } from "react";
import { QMark } from "../../assets/icons/home";
import { getAnswers, type IGetAnswersByID, type IGetPastTopics } from "../../api/home/topics";
import moment from "moment";

type Props = {
    data: IGetPastTopics[];
    isLoading: boolean;
    onClose: () => void;
};

const PAGE_SIZE = 10;

export default function PastQuestion({ data, isLoading, onClose }: Props) {
    const [page, setPage] = useState(1);
    const [answer, setAnswer] = useState<IGetAnswersByID[]>();
    const [answerOpen, setAnswerOpen] = useState(false);

    const getPastAnswer = async (id: number) => {
        setAnswerOpen(prev => !prev);
        const answer = await getAnswers(id);
        console.log(answer);
        setAnswer(answer);
    }

    const totalPages = Math.max(1, Math.ceil((data?.length ?? 0) / PAGE_SIZE));
    const list = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return (data ?? []).slice(start, start + PAGE_SIZE);
    }, [data, page]);

    return (
        <div className="flex flex-col flex-1 min-h-0">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={QMark} alt="질문 아이콘" className="size-8" />
                    <p className="font-kccganpan text-primary-300 text-[24px]">지난 질문 보기</p>
                </div>
                <button
                    onClick={onClose}
                    className="font-pretendard w-[44px] h-[31px] bg-primary-200 text-white rounded-lg text-[16px]"
                >
                    닫기
                </button>
            </div>

            {/* 질문 목록 */}
            <div className="mt-4 flex-1 min-h-0 overflow-y-auto space-y-2 pr-1">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500 animate-pulse">지난 질문을 불러오는 중입니다...</p>
                    </div>
                ) : list.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">답변한 질문이 아직 없어요.</p>
                    </div>
                ) : (
                    data.map((q) => (
                        <div key={q.id} className="rounded-lg bg-[#EFF1F0] p-4 cursor-pointer" onClick={() => getPastAnswer(q.id)}>
                            <p className="font-gangwon text-[28px] text-black">Q. {q.question}</p>
                            {answerOpen && answer && (
                                <>
                                    {answer.map((item) => (
                                        <div key={item.answerId} className="w-full h-[137px] rounded-2xl bg-white flex flex-col gap-4 p-4">
                                            <div className="flex items-center gap-2 font-kccganpan text-lg text-primary-300">
                                                <img src={item.profileUrl} className="size-11 rounded-full" />
                                                <p>{item.nickname}</p>
                                                <p className="text-sm text-[#ED9482]">{moment(item.createdAt).format("YYYY.MM.DD HH:MM")}</p>
                                            </div>
                                            <div className="w-full h-[50px] p-2 bg-[#EFF1F0] font-gangwon text-3xl text-dark-gray">
                                                <p>A. {item.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* 페이지네이션 */}
            {!isLoading && data.length > 0 && (
                <div className="mt-3 flex items-center justify-center gap-3">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="font-pretendard h-[31px] px-3 bg-primary-200 text-white rounded-lg disabled:opacity-40 text-[16px]"
                    >
                        이전
                    </button>
                    <span className="font-pretendard text-sm text-[#6B7280]">
                        {page} / {totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="font-pretendard h-[31px] px-3 bg-primary-200 text-white rounded-lg disabled:opacity-40 text-[16px]"
                    >
                        다음
                    </button>
                </div>
            )}
        </div>
    );
}