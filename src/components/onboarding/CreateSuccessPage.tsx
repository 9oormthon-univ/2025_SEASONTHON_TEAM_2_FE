import { useNavigate } from "react-router-dom";
import { MagicWand } from "../../assets/icons";
import type { IFamilyData } from "../../pages/onboarding/CreateCompletePage";

export const CreateSuccessPage = ({ familyData }: { familyData: IFamilyData }) => {
    const navigate = useNavigate();

    const nickname = familyData.nickname || localStorage.getItem("nickname") || "사용자";

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-8">
            <main className="flex w-full max-w-[1000px] flex-wrap justify-between gap-x-24 gap-y-16">
                <section className="flex flex-col gap-8">
                    <div className="pl-2 font-kccganpan">
                        <h1 className="mb-2 text-4xl">
                            <span className="text-primary-300">{nickname}</span> 님 환영합니다.
                        </h1>
                        <p className="text-3xl">
                            <span className="text-primary-300">{familyData.familyName}</span>의 가족 코드에요.
                        </p>
                    </div>
                    <div className="my-4 flex h-[240px] w-full max-w-lg items-center justify-center rounded-2xl bg-white">
                        <p className="text-6xl font-bold tracking-widest text-primary-300">{familyData.familyCode}</p>
                    </div>
                </section>

                <section className="flex flex-col gap-16 justify-center">
                    <div>
                        <p className="font-kccganpan text-3xl">설정한 가족 질문이에요.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="font-kccganpan text-3xl text-primary-200 flex items-center gap-4">
                            <span className="text-primary-300">Q. 질문</span>
                            <p>{familyData.verificationQuestion}</p>
                        </div>
                        <div className="font-kccganpan text-3xl text-primary-200 flex items-center gap-4">
                            <span className="text-primary-300">A. 답변</span>
                            <p>{familyData.verificationAnswer}</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="absolute bottom-10 w-full max-w-[1000px] px-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center font-gangwon text-3xl">
                        <img src={MagicWand} className="mr-2 size-6" alt="Magic Wand Icon" />
                        <p>홈화면 &gt; 가족설정에서 <span className="text-point-color-orange">가족 초대 링크를 공유해보세요.</span></p>
                    </div>
                    <button
                        onClick={() => navigate("/home")}
                        className="h-[80px] w-[250px] shrink-0 rounded-2xl border-2 border-primary-300 bg-back-color text-2xl font-bold text-primary-300 transition-colors hover:bg-primary-300 hover:text-white"
                    >
                        가입완료
                    </button>
                </div>
            </footer>
        </div>
    );
};