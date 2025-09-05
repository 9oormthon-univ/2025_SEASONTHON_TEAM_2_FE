import React from "react";
import Card from "../common/Card";
import { QMark } from "../../assets/icons/home";
import type { QuestionAnswer } from "../../types";

interface AnswerCardProps {
    answerData: QuestionAnswer;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answerData }) => (
    <div className="p-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="size-12 bg-dark-gray rounded-full" /> {/* Author Profile Image */}
                <p className="font-kccganpan text-primary-300 text-2xl">{answerData.author}</p>
                <span className="font-kccganpan text-point-color-orange text-sm">{answerData.timestamp}</span>
            </div>
            {answerData.isMine && (
                <button className="font-semibold w-[131px] h-[31px] bg-primary-300 text-white rounded-xl text-sm">
                    삭제하기
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
    return (
        <Card>
            {/* Question Section */}
            <div className="flex flex-col gap-4 p-2 rounded-2xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src={QMark} alt="질문 아이콘" className="size-8" />
                        <p className="font-kccganpan text-primary-300 text-2xl">오늘의 질문</p>
                        <span className="font-kccganpan text-point-color-orange">1일 남음</span>
                    </div>
                    <button className="font-semibold w-[107px] h-[31px] bg-primary-200 text-white rounded-lg text-sm">
                        지난 질문 보기
                    </button>
                </div>
                <div>
                    <p className="text-black font-gangwon text-3xl">Q. 알잘딱깔센 이란 무슨 뜻 일까요?</p>
                </div>
                <button className="font-semibold w-full h-[48px] text-xl bg-primary-200 text-white rounded-lg">
                    답변하기
                </button>
            </div>

            <hr className="border-t border-light-gray" />

            {/* Answers Section */}
            <div className="flex flex-col gap-4">
                {answers.map((item) => (
                    <AnswerCard key={item.id} answerData={item} />
                ))}
            </div>
        </Card>
    );
};

export default TodaysQuestion;