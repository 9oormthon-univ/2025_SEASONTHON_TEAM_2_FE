import MobileHeader from "../../components/mobile/MobileHeader.tsx";

export default function MobileFamilyInvitePage() {


    return (
        <div className="w-full min-h-screen max-w-[430px] mx-auto bg-white flex flex-col">
            <MobileHeader />

            <div className="flex-1 px-6 pt-10">
                <h2 className="text-center text-[25px] font-semibold mb-14 mt-20">
                    가족 확인 단계
                </h2>

                <form className="flex flex-col gap-10">
                    <div>
                        <label
                            htmlFor="nickname"
                            className="block mb-3 text-[22px] font-medium text-black"
                        >
                            가족 검증 질문
                        </label>
                        <div className="items-center ">
                            <input
                                id="nickname"
                                type="text"
                                placeholder="Q. 질문질문"
                                className="w-full rounded-2xl bg-back-color px-4 py-3 mb-7 text-[22px] outline-none"
                            />

                            <input
                                id="nickname"
                                type="text"
                                placeholder="A. 대답"
                                className="w-full rounded-2xl bg-back-color px-4 py-3 text-[22px] outline-none"
                            />
                        </div>

                    </div>

                </form>
            </div>

            {/* 버튼을 항상 아래 */}
            <div className="px-6 pb-8">
                <button
                    type="submit"
                    className="w-full rounded-2xl bg-primary-200 text-white text-[20px] font-semibold py-4 mb-10"
                >
                    다음
                </button>
            </div>
        </div>
    );
}
