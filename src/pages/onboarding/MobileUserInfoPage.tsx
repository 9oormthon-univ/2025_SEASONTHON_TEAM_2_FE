import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../../components/mobile/MobileHeader.tsx";

export default function MobileUserInfoPage() {
    const [nickname, setNickname] = useState("");
    const [familyCode, setFamilyCode] = useState("");
    const navigate = useNavigate();

    const isFormValid = nickname.trim() !== "" && familyCode.trim().length === 6;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            navigate("/mobile/family-invite");
        }
    };

    const handleFamilyCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
        setFamilyCode(value);
    };

    return (
        <div className="w-full min-h-screen max-w-[430px] mx-auto bg-white flex flex-col">
            <MobileHeader />

            <div className="flex-1 px-6 pt-10">
                <h2 className="text-center text-[25px] font-semibold mb-14 mt-20">
                    본인 설정 단계
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    {/* 닉네임 */}
                    <div>
                        <label
                            htmlFor="nickname"
                            className="block mb-3 text-[22px] font-medium text-black"
                        >
                            닉네임을 설정해주세요
                        </label>
                        <input
                            id="nickname"
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="닉네임"
                            className="w-full rounded-2xl bg-back-color px-4 py-3 text-[22px] outline-none"
                        />
                    </div>

                    {/* 가족 코드 */}
                    <div>
                        <label
                            htmlFor="familyCode"
                            className="block mb-3 text-[22px] font-medium text-black"
                        >
                            가족 코드 (6자리 숫자)
                        </label>
                        <input
                            id="familyCode"
                            type="text"
                            value={familyCode}
                            onChange={handleFamilyCodeChange}
                            placeholder="000000"
                            inputMode="numeric"
                            maxLength={6}
                            className="w-full rounded-2xl bg-back-color px-4 py-3 text-[22px] outline-none tracking-widest"
                        />
                    </div>
                </form>
            </div>

            {/* 버튼 레이아웃 원래대로 */}
            <div className="px-6 pb-8">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className={`w-full rounded-2xl text-white text-[20px] font-semibold py-4 mb-10 ${
                        isFormValid
                            ? "bg-primary-200 hover:opacity-90"
                            : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                    다음
                </button>
            </div>
        </div>
    );
}
