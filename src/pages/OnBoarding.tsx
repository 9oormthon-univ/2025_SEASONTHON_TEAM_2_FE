import { useState } from "react";
import OptionIcon from "../assets/OptionIcon.svg";
import MagicWand from "../assets/MagicWand.svg";
import CheckIcon from "../assets/CheckIcon.svg";

const STEP = {
    START: 0,
    USER_INFO: 1,
    CREATE_COMPLETE: 3,
    JOIN_QUESTION: 4,
    JOIN_PENDING: 5,
} as const;

const TYPE = {
    CREATE: "CREATE",
    JOIN: "JOIN",
} as const;

type StepValue = (typeof STEP)[keyof typeof STEP];
type TypeValue = (typeof TYPE)[keyof typeof TYPE];

interface StepInfo {
    step: StepValue;
    type: TypeValue | "";
}

interface StepProps {
    goToNextStep: (nextStep: StepValue, type?: TypeValue) => void;
}

interface Step1Props extends StepProps {
    type: TypeValue;
}

export default function OnBoarding() {
    const [stepInfo, setStepInfo] = useState<StepInfo>({
        step: STEP.JOIN_PENDING,
        type: "",
    });

    const goToNextStep = (nextStep: StepValue, type?: TypeValue) => {
        setStepInfo({ step: nextStep, type: type || stepInfo.type });
    };

    const renderStepComponent = () => {
        switch (stepInfo.step) {
            case STEP.START:
                return <Step0 goToNextStep={goToNextStep} />;
            case STEP.USER_INFO:
                return <Step1 goToNextStep={goToNextStep} type={stepInfo.type as TypeValue} />;
            case STEP.CREATE_COMPLETE:
                return <Step3 goToNextStep={goToNextStep} />;
            case STEP.JOIN_QUESTION:
                return <Step4 goToNextStep={goToNextStep} />;
            case STEP.JOIN_PENDING:
                return <Step5 goToNextStep={goToNextStep} />;
            default:
                return <div>잘못된 접근입니다.</div>;
        }
    };

    return <>{renderStepComponent()}</>;
}

// STEP 0: 시작 화면 (가족 생성 / 참여)
const Step0: React.FC<StepProps> = ({ goToNextStep }) => {
    return (
        <div className="flex h-screen flex-col justify-between p-40 px-28">
            <main>
                <div className="mb-8 flex flex-col gap-4">
                    <h1 className="font-kccganpan text-4xl text-primary-300">
                        우리 가족의 대화가 흐르는 곳, Everflow에 오신 걸 환영합니다!
                    </h1>
                    <p className="font-gangwon text-4xl text-primary-200">
                        함께라서 더 소중한, 우리 가족의 이야기를 기록해보세요 :{")"}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <input id="terms_conditions" type="checkbox" className="size-9 rounded border-gray-300" />
                    <label htmlFor="terms_conditions" className="cursor-pointer font-kccganpan text-xl text-dark-gray">
                        <span className="underline">서비스 이용 약관</span> 동의 (필수)
                    </label>
                </div>
            </main>
            <footer className="flex self-end gap-4">
                <button
                    onClick={() => goToNextStep(STEP.USER_INFO, TYPE.CREATE)}
                    className="h-[90px] w-[250px] cursor-pointer rounded-lg border-2 border-primary-300 bg-transparent text-2xl font-semibold transition-colors hover:bg-primary-300 hover:text-white"
                >
                    가족 생성하기
                </button>
                <div className="relative flex flex-col items-center">
                    <div className="absolute -top-16 w-max rounded-lg border border-primary-200 bg-[#ECF5F1] px-5 py-3 shadow-md">
                        <p className="text-sm text-primary-300">가족에게 초대 받으셨나요? 참여하기를 눌러주세요.</p>
                        <div className="absolute -bottom-2 right-4 z-[-1] size-4 rotate-45 border-b border-r border-primary-200 bg-[#ECF5F1]"></div>
                    </div>
                    <button
                        onClick={() => goToNextStep(STEP.USER_INFO, TYPE.JOIN)}
                        className="h-[90px] w-[250px] cursor-pointer rounded-lg bg-primary-200 text-2xl font-semibold text-white transition-opacity hover:opacity-90"
                    >
                        가족 참여하기
                    </button>
                </div>
            </footer>
        </div>
    );
};

// STEP 1: 닉네임, 가족명, 가족질문 입력
const Step1: React.FC<Step1Props> = ({ goToNextStep, type }) => {
    const nextStep = type === TYPE.CREATE ? STEP.CREATE_COMPLETE : STEP.JOIN_QUESTION;

    return (
        <div className="relative flex h-screen w-screen flex-col items-center justify-center px-28">
            <form className="w-full">
                <main className="flex justify-between gap-8">
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
                            <p className="pl-2 font-gangwon text-2xl">
                                최대 8글자, 우리 가족에게만 보여지며, 추후 수정이 가능해요.
                            </p>
                        </div>
                    </section>

                    {/* 가족 생성 시에만 보이는 질문 섹션 */}
                    {type === TYPE.CREATE && (
                        <section>
                            <p className="mb-4 font-kccganpan text-3xl text-primary-200">
                                이어서, 가족 검증 질문을 작성해주세요
                            </p>
                            {/* 질문/답변 입력 그룹 */}
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
            </form>
            <footer className="absolute bottom-20 w-full max-w-[calc(100%-14rem)]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src={OptionIcon} className="size-6" alt="옵션 아이콘" />
                        <p className="ml-2 font-gangwon text-3xl">
                            가족명과 가족 검증 질문은 추후 홈화면 &gt; 가족설정에서{" "}
                            <span className="text-point-color-orange">수정할 수 있어요.</span>
                        </p>
                    </div>
                    <button
                        onClick={() => goToNextStep(nextStep)}
                        className="h-[90px] w-[250px] cursor-pointer rounded-2xl border-2 border-primary-300 bg-[#ECF5F1] text-2xl font-bold text-primary-300 transition-colors hover:bg-primary-100"
                    >
                        {type === TYPE.CREATE ? "생성하기" : "다음"}
                    </button>
                </div>
            </footer>
        </div>
    );
};

// STEP 3: 가족 생성 완료
const Step3: React.FC<StepProps> = ({ goToNextStep }) => {
    return (
        <div className="flex h-screen w-screen flex-col justify-center px-28">
            <main className="flex justify-between">
                {/* 왼쪽: 환영 문구 및 코드 */}
                <div className="flex flex-col gap-16">
                    <div className="flex flex-col gap-2 font-kccganpan">
                        <div className="pl-2">
                            <h1 className="mb-2 text-5xl">
                                <span className="text-primary-300">귀여운막내</span> 님 환영합니다.
                            </h1>
                            <p className="text-3xl text-primary-200">
                                <span className="text-point-color-orange">행복한 우리집</span>의 가족 코드에요.
                            </p>
                        </div>
                        <div className="my-4 flex h-[184px] w-[424px] items-center justify-center rounded-2xl border border-light-gray bg-white">
                            <p className="text-6xl font-bold text-primary-300">0 0 0 0 0 0</p>
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
                    </div>
                </div>
                {/* 오른쪽: 가족 질문 */}
                <div className="flex flex-col gap-8">
                    <div>
                        <p className="font-kccganpan text-3xl text-primary-200">설정한 가족 질문이에요.</p>
                        <p className="font-gangwon text-2xl text-[#818181]">
                            초대받은 가족이 가입시 <span className="underline">가족 질문을 맞추면</span>, 바로
                            가족구성원으로 수락돼요.
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
                        <p>
                            초대받은 가족이 가입시 가족 질문을 <span className="text-point-color-orange">3회 이상</span>{" "}
                            틀리면
                        </p>
                        <p>
                            <span className="text-primary-300">알림 &gt; 가족 대기 수락</span>을 통해 수락할 수 있어요.
                        </p>
                    </div>
                </div>
            </main>
            <footer className="absolute bottom-20 left-0 right-0 px-28">
                <div className="flex items-center justify-between">
                    <div className="flex items-center font-gangwon text-3xl">
                        <img src={MagicWand} className="mr-2 size-6" alt="Magic Wand Icon" />
                        <p>
                            홈화면 &gt; 가족설정에서{" "}
                            <span className="text-point-color-orange">가족 초대 링크를 공유해보세요.</span>
                        </p>
                    </div>
                    <button
                        onClick={() => goToNextStep(STEP.JOIN_PENDING, TYPE.CREATE)}
                        className="h-[90px] w-[250px] cursor-pointer rounded-2xl border-2 border-primary-300 bg-[#ECF5F1] text-2xl font-bold text-primary-300 transition-colors hover:bg-primary-100"
                    >
                        가입완료
                    </button>
                </div>
            </footer>
        </div>
    );
};

// STEP 4: 가족 질문 답변
const Step4: React.FC<StepProps> = ({ goToNextStep }) => {
    return (
        <div className="flex h-screen w-screen flex-col justify-center px-28">
            <main className="flex justify-between h-[400px]">
                <div className="flex flex-col gap-16">
                    <div className="flex flex-col gap-2 font-kccganpan">
                        <div className="pl-2">
                            <h1 className="mb-2 text-4xl">
                                <span className="text-primary-300">Q. 질문</span> 우리 가족 구성원은 몇 명 인가요?
                            </h1>
                        </div>
                        <div className="ml-4">
                            <input
                                id="answer"
                                type="text"
                                placeholder="4명"
                                maxLength={20}
                                className="w-[540px] h-[90px] rounded-2xl border border-light-gray bg-white p-5 pl-8 text-2xl text-light-gray"
                            />
                        </div>
                    </div>
                </div>
            </main>
            <footer className="absolute bottom-20 left-0 right-0 px-28">
                <div className="flex items-center justify-between">
                    <div className="flex items-center font-gangwon text-3xl">
                        <img src={MagicWand} className="mr-2 size-6" alt="Magic Wand Icon" />
                        <p>
                            질문을 맞추는 경우 바로 가족에 가입됩니다. 3회 이상 틀리는 경우 가족 가입 대기 상태로
                            전환됩니다.
                        </p>
                    </div>
                    <button
                        onClick={() => goToNextStep(STEP.JOIN_PENDING)}
                        className="h-[90px] w-[250px] cursor-pointer text-white rounded-2xl bg-primary-200 text-2xl font-bold transition-colors hover:bg-primary-100"
                    >
                        입장하기
                    </button>
                </div>
            </footer>
        </div>
    );
};

// STEP 5: 가입 대기
const Step5: React.FC<StepProps> = ({ goToNextStep }) => {
    const [isModalOpen, setModalIsOpen] = useState(false);
    return (
        <div className="flex h-screen w-screen flex-col justify-center px-28 relative">
            <main className="flex justify-between h-[400px]">
                <div className="flex flex-col gap-16">
                    <div className="flex flex-col gap-2 font-kccganpan">
                        <div className="pl-2 font-kccganpan text-primary-300">
                            <h1 className="mb-4 text-4xl">가족 가입 대기중이에요.</h1>
                            <div className="text-2xl">
                                <p>가족 그룹장이 수락 즉시 가족에 소속됩니다.</p>
                                <p>
                                    만약 잘못 요청 한 것 같다면, 아래 다시 신청하기 버튼을 눌러 가족 가입을 새로
                                    신청하실 수 있어요.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute  bottom-0 top-1/2 left-[50% - 303px] w-[606px] h-[168px] border-2 border-primary-200 rounded-2xl">
                    <div className="flex items-center">
                        <img src={CheckIcon} />
                        <p className="text-3xl font-bold text-primary-300">현재 가족 수락을 기다리고 있습니다.</p>
                    </div>
                    <div className="font-semibold text-2xl text-[#353535]">
                        <p className="pl-9">오래 기다려도 수락되지 않는다면? 다음을 확인해주세요.</p>
                        <ul>
                            <li>1. 올바른 가족코드를 기입하셨나요?</li>
                            <li>2. 가족의 그룹장에게 수락을 요청해보세요!</li>
                        </ul>
                    </div>
                </div>
            </main>
            <footer className="absolute bottom-20 left-0 right-0 px-28">
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => {
                            setModalIsOpen(true)
                        }}
                        className="h-[90px] w-[250px] cursor-pointer text-primary-300 rounded-2xl bg-[#ECF5F1] border-2 border-primary-200 text-2xl font-bold transition-colors hover:bg-primary-100"
                    >
                        기다리기
                    </button>
                    <button
                        onClick={() => goToNextStep(STEP.START)}
                        className="w-[250px] h-[90px] cursor-pointer text-white rounded-2xl bg-primary-200 text-2xl font-bold transition-colors hover:bg-primary-100"
                    >
                        다시 신청하기
                    </button>
                </div>
            </footer>
        </div>
    );
};