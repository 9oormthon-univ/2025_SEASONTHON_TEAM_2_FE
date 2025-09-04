import { STEP, TYPE, type Step1Props } from "../../types/onboarding.types";
import OptionIcon from "../../assets/OptionIcon.svg";

export const InputUserInfo: React.FC<Step1Props> = ({ goToNextStep, type }) => {
    const nextStep = type === TYPE.CREATE ? STEP.CREATE_COMPLETE : STEP.JOIN_QUESTION;

    return (
        // items-center justify-center로 전체 콘텐츠를 중앙에 배치
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-8">
            {/* max-w-7xl로 최대 너비를 제한하고, w-full로 너비를 채움 */}
            <main className="flex w-full max-w-[1440px] flex-wrap justify-center gap-x-24 gap-y-16">
                {/* 왼쪽 섹션 */}
                <section className="flex flex-col gap-16">
                    {/* 닉네임 입력 그룹 */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nickname" className="pl-2 font-kccganpan text-4xl text-primary-300">
                            먼저 닉네임을 설정해주세요!
                        </label>
                        <input
                            id="nickname"
                            type="text"
                            placeholder="귀여운 막내"
                            maxLength={5}
                            className="h-[90px] w-[540px] rounded-2xl border border-light-gray bg-white p-5 pl-8 text-2xl text-light-gray"
                        />
                        <p className="pl-2 font-gangwon text-2xl">최대 5글자, 추후 수정이 가능해요.</p>
                    </div>
                    {/* 가족명 입력 그룹 */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="homeName" className="pl-2 font-kccganpan text-4xl text-primary-300">
                            가족명을 설정해주세요!
                        </label>
                        <input
                            id="homeName"
                            type="text"
                            placeholder="행복한 우리집"
                            maxLength={8}
                            className="h-[90px] w-[540px] rounded-2xl border border-light-gray bg-white p-5 pl-8 text-2xl text-light-gray"
                        />
                        <p className="pl-2 font-gangwon text-2xl">최대 8글자, 우리 가족에게만 보여지며, 추후 수정이 가능해요.</p>
                    </div>
                </section>

                {/* 오른쪽 섹션 (가족 생성 시) */}
                {type === TYPE.CREATE && (
                    <section>
                        <p className="mb-4 font-kccganpan text-3xl text-primary-200">이어서, 가족 검증 질문을 작성해주세요</p>
                        <div className="mb-4 flex flex-col gap-2">
                            <label htmlFor="question" className="pl-2 font-kccganpan text-2xl text-primary-500">
                                Q. 질문
                            </label>
                            <input
                                id="question"
                                type="text"
                                placeholder="우리 가족 구성원은 몇 명 인가요?"
                                maxLength={20}
                                className="h-[90px] w-[540px] rounded-2xl border border-light-gray bg-white p-5 pl-8 text-2xl text-light-gray"
                            />
                            <p className="self-end p-2 font-gangwon text-2xl">최대 20자, 추후 수정이 가능해요</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="answer" className="pl-2 font-kccganpan text-2xl text-primary-500">
                                A. 답변
                            </label>
                            <input
                                id="answer"
                                type="text"
                                placeholder="4명"
                                maxLength={20}
                                className="h-[90px] w-[540px] rounded-2xl border border-light-gray bg-white p-5 pl-8 text-2xl text-light-gray"
                            />
                            <p className="self-end p-2 font-gangwon text-2xl">최대 20자, 추후 수정이 가능해요</p>
                        </div>
                    </section>
                )}
            </main>

            <footer className="absolute bottom-10 w-full max-w-7xl px-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                        <img src={OptionIcon} className="size-6" alt="옵션 아이콘" />
                        <p className="ml-2 font-gangwon text-3xl">
                            가족명과 가족 검증 질문은 추후 홈화면 &gt; 가족설정에서{" "}
                            <span className="text-point-color-orange">수정할 수 있어요.</span>
                        </p>
                    </div>
                    <button
                        onClick={() => goToNextStep(nextStep)}
                        className="h-[90px] w-[250px] shrink-0 cursor-pointer rounded-2xl border-2 border-primary-300 bg-[#ECF5F1] text-2xl font-bold text-primary-300 transition-colors hover:bg-primary-100"
                    >
                        {type === TYPE.CREATE ? "생성하기" : "다음"}
                    </button>
                </div>
            </footer>
        </div>
    );
};