import { useState } from "react"

export default function OnBoarding() {
    const [step, setStep] = useState(0);

    if (step === 0) {
        return (
            <div className="h-full px-28 flex flex-col justify-around gap-32">
                <div className="self-baseline">
                    <p className="text-primary-500 font-bold text-4xl mb-2">Everflow의 가족이 되신 것을 환영합니다.</p>
                    <p className="font-gangwon text-4xl">여러분은 부모님, 혹은 자녀를 얼마나 알고 있나요?<br />
                        단절되었던거 같아 답답했던 가족과의 관계, Everflow에서 풀어봐요</p>
                </div>
                <button onClick={() => setStep(1)} className="cursor-pointer self-end bg-primary-300 w-[473px] h-[60px] rounded-md text-white/85 text-3xl font-bold">다음</button>
            </div>
        )
    }
    if (step === 1) {
        return (
            <div className="h-full px-28 flex flex-col justify-around gap-32">
                <div className="self-baseline flex flex-col gap-4">
                    <p className="text-primary-500 font-bold text-4xl mb-2">닉네임을 설정해주세요!</p>
                    <p className="font-gangwon text-4xl">우리 가족에게만 보여지며, 외부로 공개되지 않습니다.</p>
                    <input placeholder="닉네임을 입력해주세요!" className="w-[602px] h-[100px] border border-light-gray rounded-lg p-5 text-2xl" />
                </div>
                <button className="self-end bg-primary-300 w-[473px] h-[60px] rounded-md text-white/85 text-3xl font-bold">다음</button>
            </div>
        )
    }
    return (
        <div></div>
    )
}