import React, { useEffect, useMemo, useRef, useState } from "react";
import Card from "../common/Card";
import { Heart, QMark } from "../../assets/icons/home";
import SectionHeader from "../common/SectionHeader";
import ProgressBar from "./ProgressBar";
import PastQuestion from "./PastQuestion";
import { getAnswers, getCurrentTopic, getPastTopics, modifyMyAnswer } from "../../api/home/topics";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { diffDay } from "../../lib/util";
import moment from "moment";
import LoadingSpinner from "../LoadingSpinner";
import { getProgressFamily } from "../../api/auth/family";
import { useAuthStore } from "../../store/auth";

const AnswerCard = ({ answerData, myUserId, onEdit }: {
    answerData: {
        answerId: number;
        content: string;
        createdAt: string;
        nickname: string;
        topicId: number;
        userId: number;
        profileUrl: string;
    };
    myUserId: number | undefined;
    onEdit: () => void;
}) => (
    <div className="p-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <img src={answerData.profileUrl} className="size-12 rounded-full" />
                <p className="font-kccganpan text-primary-300 text-2xl">{answerData.nickname}</p>
                <span className="font-kccganpan text-point-color-orange text-sm">{moment(answerData.createdAt).format("YYYY-MM-DD HH:MM")}</span>
            </div>
            {myUserId === answerData.userId && (
                <button
                    onClick={onEdit}
                    className="font-pretendard h-8 px-3 bg-gray-200 text-gray-700 rounded-lg text-sm"
                >
                    수정하기
                </button>
            )}
        </div>
        <div className="bg-[#EFF1F0] p-2 h-14 rounded-2xl flex items-center">
            <p className="font-gangwon text-dark-gray text-3xl">A. {answerData.content}</p>
        </div>
    </div>
);


const TodaysQuestion = () => {
    const { user: currentUser } = useAuthStore();
    const myUserId = currentUser?.userId;
    const queryClient = useQueryClient();

    const [isWriting, setIsWriting] = useState(false);
    const [text, setText] = useState("");
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [view, setView] = useState<"today" | "history">("today");

    const { data: currentTopic, isLoading: topicLoading } = useQuery({
        queryKey: ["current-topics"],
        queryFn: getCurrentTopic
    });

    const { data: answerData, isLoading: answerLoading } = useQuery({
        queryKey: ["answers", currentTopic?.id],
        queryFn: () => getAnswers(currentTopic!.id),
        enabled: !!currentTopic?.id
    });

    const { data: pastTopicsData, isLoading: pastDataLoading } = useQuery({
        queryKey: ["pastTopics"],
        queryFn: getPastTopics,
        enabled: view === "history",
    });

    const { data: percentage } = useQuery({
        queryKey: ["percentage"],
        queryFn: getProgressFamily
    });

    const { mutate: submitAnswer, isPending: isSubmitting } = useMutation({
        mutationFn: (newAnswer: string) => modifyMyAnswer(currentTopic!.id, newAnswer),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["answers", currentTopic?.id] });
            setText("");
            setIsWriting(false);
        },
        onError: (error) => {
            console.error("답변 제출 실패:", error);
            alert("답변 제출에 실패했습니다.");
        }
    });

    const hasMyAnswer = useMemo(() => {
        if (!answerData || !myUserId) return false;
        return answerData.some(answer => answer.userId === myUserId);
    }, [answerData, myUserId]);

    useEffect(() => {
        if (isWriting) inputRef.current?.focus();
    }, [isWriting]);

    const handleEdit = () => {
        const myAnswer = answerData?.find(answer => answer.userId === myUserId);
        if (myAnswer) {
            setText(myAnswer.content);
            setIsWriting(true);
        }
    }

    const handleSubmit = () => {
        if (!currentTopic || text.trim() === "" || isSubmitting) return;
        submitAnswer(text);
    };

    const handleAction = () => {
        if (!isWriting) {
            setIsWriting(true);
            return;
        }
        handleSubmit();
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };


    return (
        <div className="flex flex-col gap-4 h-[750px]">
            {view === "today" && !isWriting && (
                <Card className="h-[128px] flex flex-col justify-around">
                    <SectionHeader title="우리 가족이 이만큼 가까워졌어요!" icon={Heart} />
                    <div className="flex justify-center">
                        <ProgressBar percentage={percentage ?? 0} />
                    </div>
                </Card>
            )}

            <Card className={`${(isWriting || view === "history") ? "h-[735px]" : "h-[595px]"} flex flex-col min-h-0 overflow-hidden transition-[height]`}>
                {view === "history" ? (
                    <PastQuestion data={pastTopicsData || []} isLoading={pastDataLoading} onClose={() => setView("today")} />
                ) : (
                    <>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img src={QMark} alt="질문 아이콘" className="size-8" />
                                    <p className="font-kccganpan text-primary-300 text-[24px]">오늘의 질문</p>
                                    {
                                        currentTopic && (
                                            <span className="font-kccganpan text-point-color-orange">{diffDay(currentTopic.activeFrom, currentTopic?.activeUntil)}</span>
                                        )
                                    }
                                </div>
                                <button
                                    onClick={() => setView("history")}
                                    className="font-pretendard w-[107px] h-[31px] bg-primary-200 text-white rounded-lg text-[16px]"
                                >
                                    지난 질문 보기
                                </button>
                            </div>

                            <div>
                                {topicLoading ? (
                                    <p className="text-black font-gangwon text-3xl animate-bounce text-center">
                                        오늘의 질문을 불러오고 있어요!!
                                    </p>
                                ) : (
                                    <p className="text-black font-gangwon text-3xl">
                                        Q. {currentTopic?.question}
                                    </p>
                                )}
                            </div>

                            {isWriting && (
                                <textarea
                                    ref={inputRef}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    onKeyDown={onKeyDown}
                                    placeholder="답변을 입력해주세요"
                                    rows={1}
                                    className="w-full p-3 text-[30px] rounded-2xl bg-[#EFF1F0] font-gangwon"
                                />
                            )}

                            <button
                                onClick={handleAction}
                                disabled={hasMyAnswer && !isWriting}
                                className="font-pretendard w-full h-[48px] text-[20px] bg-primary-200 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isWriting ? (isSubmitting ? "제출 중..." : "제출하기") : (hasMyAnswer ? "답변 완료!" : "답변하기")}
                            </button>
                        </div>

                        <hr className="border-t border-light-gray my-4" />

                        {answerLoading ? (
                            <LoadingSpinner size={64} text="답변 불러오는 중" />
                        ) : (
                            <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
                                {answerData?.map((item) => (
                                    <AnswerCard
                                        key={item.answerId}
                                        answerData={item}
                                        myUserId={myUserId}
                                        onEdit={handleEdit}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </Card>
        </div>
    );
};

export default TodaysQuestion;