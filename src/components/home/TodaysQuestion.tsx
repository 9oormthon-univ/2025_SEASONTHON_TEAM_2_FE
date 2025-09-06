import React, { useEffect, useRef, useState } from "react";
import Card from "../common/Card";
import { Heart, QMark } from "../../assets/icons/home";
import type { QuestionAnswer } from "../../types";
import SectionHeader from "../common/SectionHeader";
import ProgressBar from "./ProgressBar";
import PastQuestion from "./PastQuestion";
import { getCurrentTopic } from "../../api/home/topics";
import { useQuery } from "@tanstack/react-query";
import { diffDay } from "../../lib/util";

interface AnswerCardProps {
    answerData: QuestionAnswer;
    onDelete?: (id: number) => void;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answerData, onDelete }) => (
    <div className="p-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="size-12 bg-dark-gray rounded-full" />
                <p className="font-kccganpan text-primary-300 text-2xl">{answerData.author}</p>
                <span className="font-kccganpan text-point-color-orange text-sm">{answerData.timestamp}</span>
            </div>
            {answerData.isMine && (
                <button
                    onClick={() => onDelete?.(answerData.id)}
                    className="font-semibold w-[44px] h-[31px] bg-primary-200 text-white rounded-lg text-sm"
                >
                    삭제
                </button>
            )}
        </div>
        <div className="bg-[#EFF1F0] p-2 h-14 rounded-2xl flex items-center">
            <p className="font-gangwon text-dark-gray text-3xl">A. {answerData.answer}</p>
        </div>
    </div>
);

interface TodaysQuestionProps {
    answers: QuestionAnswer[];
}

const TodaysQuestion: React.FC<TodaysQuestionProps> = ({ answers }) => {
    const { data: currentTopic, isLoading: topicLoading } = useQuery({
        queryKey: ["current-topics"],
        queryFn: getCurrentTopic
    });

    console.log("qweqwe", currentTopic)
    const [list, setList] = useState<QuestionAnswer[]>(answers);
    const [isWriting, setIsWriting] = useState(false);
    const [text, setText] = useState("");
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    const [view, setView] = useState<"today" | "history">("today");

    const raw = localStorage.getItem("userInfo")?.split("|")[1] || "나";
    const me = raw.startsWith("@") ? raw.slice(1) : raw;

    const hasMyAnswer = list.some(a => a.isMine && a.author === me);

    useEffect(() => {
        if (isWriting) inputRef.current?.focus();
    }, [isWriting]);

    const formatTS = () => {
        const n = new Date();
        const y = n.getFullYear();
        const m = String(n.getMonth() + 1).padStart(2, "0");
        const d = String(n.getDate()).padStart(2, "0");
        const hh = String(n.getHours()).padStart(2, "0");
        const mm = String(n.getMinutes()).padStart(2, "0");
        return `${y}-${m}-${d} ${hh}:${mm}`;
    };

    const handleSubmit = () => {
        const v = text.trim();
        if (!v) return;
        const newItem: QuestionAnswer = {
            id: Date.now(),
            author: me,
            timestamp: formatTS(),
            answer: v,
            isMine: true,
        };
        setList(prev => [newItem, ...prev]); // 맨 위로 쌓기
        setText("");
        setIsWriting(false);
    };

    const handleAction = () => {
        if (!isWriting) {
            setIsWriting(true);
            return;
        }
        handleSubmit();
    };

    const handleDelete = (id: number) => {
        setList(prev => prev.filter(item => item.id !== id));
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };

    type PastQuestionItem = { id: number; question: string; answers: QuestionAnswer[] };


    const pastData: PastQuestionItem[] = [
        {
            id: 101,
            question: "어릴 적 가장 좋아했던 장소는?",
            answers: [
                { id: 1, author: "엄마", timestamp: "2025-08-21 09:10", answer: "동네 공원", isMine: false },
                { id: 2, author: "아빠", timestamp: "2025-08-21 09:15", answer: "한강 시민공원", isMine: false },
            ],
        },
        {
            id: 102,
            question: "가장 기억에 남는 여행지는?",
            answers: [
                { id: 3, author: "엄마", timestamp: "2025-08-20 20:10", answer: "제주도", isMine: false },
                { id: 4, author: "아빠", timestamp: "2025-08-20 20:22", answer: "교토", isMine: false },
            ],
        },
        {
            id: 103,
            question: "내가 좋아하는 계절과 이유는?",
            answers: [
                { id: 5, author: "엄마", timestamp: "2025-08-19 12:01", answer: "봄, 벚꽃이 좋아서", isMine: false },
                { id: 6, author: "아빠", timestamp: "2025-08-19 12:05", answer: "가을, 선선해서", isMine: false },
            ],
        },
        {
            id: 104,
            question: "최근에 배운 것 중 가장 흥미로웠던 것?",
            answers: [],
        },
        {
            id: 105,
            question: "가장 좋아하는 음식과 이유는?",
            answers: [
                { id: 7, author: "엄마", timestamp: "2025-08-18 08:30", answer: "비빔밥, 골고루 먹을 수 있어서", isMine: false },
                { id: 8, author: "아빠", timestamp: "2025-08-18 08:33", answer: "순대국, 든든해서", isMine: false },
            ],
        },
        {
            id: 106,
            question: "어린 시절 가장 친했던 친구는 누구였나요?",
            answers: [],
        },
        {
            id: 107,
            question: "가족과 함께한 추억 중 가장 행복했던 순간은?",
            answers: [
                { id: 9, author: "엄마", timestamp: "2025-08-17 21:10", answer: "첫 가족여행 갔을 때", isMine: false },
                { id: 10, author: "아빠", timestamp: "2025-08-17 21:12", answer: "캠핑장에서 불멍", isMine: false },
            ],
        },
        {
            id: 108,
            question: "요즘 가장 관심 있는 취미는?",
            answers: [],
        },
        {
            id: 109,
            question: "나를 가장 잘 표현하는 한 단어는?",
            answers: [
                { id: 11, author: "엄마", timestamp: "2025-08-16 10:05", answer: "다정", isMine: false },
                { id: 12, author: "아빠", timestamp: "2025-08-16 10:07", answer: "성실", isMine: false },
            ],
        },
        {
            id: 110,
            question: "올해 가장 이루고 싶은 목표는?",
            answers: [],
        },
        {
            id: 111,
            question: "가장 좋아하는 영화/드라마는?",
            answers: [
                { id: 13, author: "엄마", timestamp: "2025-08-15 19:40", answer: "리틀 포레스트", isMine: false },
                { id: 14, author: "아빠", timestamp: "2025-08-15 19:42", answer: "인셉션", isMine: false },
            ],
        },
    ];




    return (
        <div className="flex flex-col gap-4 h-[750px]">
            {view === "today" && !isWriting && (
                <Card className="h-[128px] flex flex-col justify-around">
                    <SectionHeader title="우리 가족이 이만큼 가까워졌어요!" icon={Heart} />
                    <div className="flex justify-center">
                        <ProgressBar percentage={70} />
                    </div>
                </Card>
            )}

            <Card className={`${(isWriting || view === "history") ? "h-[735px]" : "h-[595px]"} flex flex-col min-h-0 overflow-hidden transition-[height]`}>
                {view === "history" ? (
                    <PastQuestion data={pastData} onClose={() => setView("today")} />
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

                            {isWriting && !hasMyAnswer && (
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

                            {!hasMyAnswer && (
                                <button
                                    onClick={handleAction}
                                    className="font-pretendard w-full h-[48px] text-[20px] bg-primary-200 text-white rounded-lg"
                                >
                                    {isWriting ? "제출하기" : "답변하기"}
                                </button>
                            )}
                        </div>

                        <hr className="border-t border-light-gray my-4" />

                        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
                            {list.map((item) => (
                                <AnswerCard key={item.id} answerData={item} onDelete={handleDelete} />
                            ))}
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
};

export default TodaysQuestion;
