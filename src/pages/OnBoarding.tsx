import { useState } from "react"
import ToolTip from "../assets/Tooltip.svg?url";

export default function OnBoarding() {
    const [step, setStep] = useState(0);
    console.log(ToolTip)
    if (step === 0) {
        return (
            <div className="h-screen px-28 flex flex-col justify-between p-40">
                <div className="self-baseline flex flex-col gap-4">
                    <h1 className="text-primary-500 font-bold text-4xl mb-2">Everflow의 가족이 되신 것을 환영합니다.</h1>
                    <p className="font-gangwon text-4xl">여러분은 부모님, 혹은 자녀를 얼마나 알고 있나요?<br />
                        단절되었던거 같아 답답했던 가족과의 관계, Everflow에서 풀어봐요</p>
                </div>
                <div className="flex gap-4 self-end">
                    <button onClick={() => setStep(1)} className="cursor-pointer bg-none border-2 border-primary-300 w-[250px] h-[90px] rounded-lg text-2xl font-semibold">가족 생성하기</button>
                    <div className="flex flex-col items-center relative">
                        <div className="absolute -top-16 w-[256px] h-[49px]">
                            <img src={ToolTip} />
                            <div
                                className="relative w-[256px] h-[49px] bg-cover bg-no-repeat bg-center"
                                style={{ backgroundImage: `url(${ToolTip})` }}
                            >
                                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      font-medium text-white text-xs px-5 whitespace-nowrap">
                                    가족에게 초대 받으셨나요? 참여하기를 눌러주세요.
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setStep(2)} className="cursor-pointer bg-primary-300 w-[250px] h-[90px] rounded-lg text-white text-2xl font-semibold">가족 참여하기</button>
                    </div>
                </div>
            </div>
        )
    }

    //가족 생성하기
    if (step === 1) {
        return (
            <div className="h-full px-28 flex flex-col justify-around  gap-32">
                <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-32">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-primary-500 font-bold text-4xl mb-2">먼저 닉네임을 설정해주세요!</h1>
                            <input id="nickName" placeholder={localStorage.getItem("userInfo")?.split("|")[1] || ""} className="w-[540px] h-[90px] border border-light-gray rounded-2xl p-5 text-2xl" />
                            <label htmlFor="nickName" className="text-2xl font-gangwon">최대 5글자, 추후 수정이 가능해요.</label>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h1 className="text-primary-500 font-bold text-4xl mb-2">가족명을 설정해주세요!</h1>
                            <input id="homeName" placeholder="행복한 우리집" className="w-[540px] h-[90px] border border-light-gray rounded-2xl p-5 text-2xl" />
                            <label htmlFor="homeName" className="text-2xl font-gangwon">최대 8글자, 우리 가족에게만 보여지며, 추후 수정이 가능해요.</label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-16">
                        <p className="font-bold text-3xl text-primary-200">이어서, 가족 검증 질문을 작성해주세요!</p>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2 w-[540px]">
                                <p className="text-primary-500 text-2xl">Q. 질문</p>
                                <input id="nickName" placeholder="우리 가족 구성원은 몇 명 인가요?" className="text-center h-[90px] border border-light-gray rounded-2xl p-5 text-2xl" />
                                <label htmlFor="nickName" className="text-end text-2xl font-gangwon">최대 20자, 추후 수정이 가능해요.</label>
                            </div>
                            <div className="flex flex-col gap-2 w-[540px]">
                                <p className="text-primary-500 text-2xl">A. 답변</p>
                                <input id="nickName" placeholder="4명" className="text-center h-[90px] border border-light-gray rounded-2xl p-5 text-2xl" />
                                <label htmlFor="nickName" className="text-end text-2xl font-gangwon">최대 8글자, 추후 수정이 가능해요.</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center justify-center">
                        <div className="size-6 bg-dark-gray" />
                        <p className="text-3xl font-gangwon">가족명과 가족 검증 질문은 추후 홈화면 &gt; 가족설정에서 <span className="text-pint-color">수정할 수 있어요.</span></p>
                    </div>
                    <button onClick={() => setStep(1)} className="cursor-pointer bg-none border-2 border-primary-300 w-[250px] h-[90px] rounded-2xl text-2xl font-bold text-primary-300">생성하기</button>
                </div>
            </div>
        )
    }
    if (step === 3) {
        return (
            <div>

            </div>
        )
    }
    return (
        <div></div>
    )
}