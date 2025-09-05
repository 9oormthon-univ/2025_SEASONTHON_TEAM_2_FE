import { useNavigate } from "react-router-dom";
import { MagicWand } from "../../assets/icons";

export const CreateSuccessPage = () => {
    const navigate = useNavigate();
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-8">
            {/* 최대 너비 제한 및 중앙 정렬 */}
            <main className="flex w-full max-w-7xl flex-wrap justify-center gap-x-24 gap-y-16">
                {/* 왼쪽: 환영 문구 및 코드 */}
                <section className="flex flex-col gap-8">
                    <div className="pl-2 font-kccganpan">
                        <h1 className="mb-2 text-5xl">
                            <span className="text-primary-300">귀여운막내</span> 님 환영합니다.
                        </h1>
                        <p className="text-3xl text-primary-200">
                            <span className="text-point-color-orange">행복한 우리집</span>의 가족 코드에요.
                        </p>
                    </div>
                    <div className="my-4 flex h-[184px] w-full max-w-md items-center justify-center rounded-2xl border border-light-gray bg-white">
                        <p className="text-6xl font-bold tracking-widest text-primary-300">000000</p>
                    </div>
                    <div className="self-end text-right font-gangwon">
                        <p className="text-3xl">
                            <span className="text-point-color-orange">가족 코드는 </span>우리 가족 외에는{" "}
                            <span className="text-point-color-orange">비밀</span>이에요 쉿!
                        </p>
                        <p className="text-2xl text-[#818181]">
                            가족이 최초 가입시 <span className="underline">가족 코드 입력이 필요</span>해요
                        </p>
                    </div>
                </section>

                {/* 오른쪽: 가족 질문 */}
                <section className="flex flex-col gap-8">
                    <div>
                        <p className="font-kccganpan text-3xl text-primary-200">설정한 가족 질문이에요.</p>
                        <p className="font-gangwon text-2xl text-[#818181]">
                            초대받은 가족이 가입시 <span className="underline">가족 질문을 맞추면</span>, 바로 가족구성원으로 수락돼요.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="font-kccganpan text-2xl text-primary-200">
                            <span className="text-primary-300">Q. 질문</span> 우리 가족 구성원은 몇 명 인가요?
                        </p>
                        <p className="font-kccganpan text-2xl text-primary-200">
                            <span className="text-primary-300">A. 답변</span> 4명
                        </p>
                    </div>
                    <div className="text-right font-gangwon text-3xl">
                        <p>초대받은 가족이 가입시 가족 질문을 <span className="text-point-color-orange">3회 이상</span> 틀리면</p>
                        <p><span className="text-primary-300">알림 &gt; 가족 대기 수락</span>을 통해 수락할 수 있어요.</p>
                    </div>
                </section>
            </main>

            <footer className="absolute bottom-10 w-full max-w-7xl px-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center font-gangwon text-3xl">
                        <img src={MagicWand} className="mr-2 size-6" alt="Magic Wand Icon" />
                        <p>홈화면 &gt; 가족설정에서 <span className="text-point-color-orange">가족 초대 링크를 공유해보세요.</span></p>
                    </div>
                    <button
                        onClick={() => navigate("/home")}
                        className="h-[90px] w-[250px] shrink-0 rounded-2xl border-2 border-primary-300 bg-[#ECF5F1] text-2xl font-bold text-primary-300 transition-colors hover:bg-primary-100"
                    >
                        가입완료
                    </button>
                </div>
            </footer>
        </div>
    );
};