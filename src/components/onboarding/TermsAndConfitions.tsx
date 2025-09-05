import { STEP, type StepProps } from "../../types/onboarding.types"

export const TermsAndConfitions: React.FC<StepProps> = ({ goToNextStep }) => {
    return (
        <div className="flex min-h-screen flex-col justify-between p-8 sm:p-16 md:p-28">
            <main>
                <div className="flex flex-col gap-4">
                    <h1 className="font-kccganpan text-4xl text-primary-300">
                        서비스 이용 약관 상세보기 페이지입니다.
                    </h1>
                    <div className="overflow-scroll p-5 w-[627px] h-[525px] bg-[#FFFCFA] border border-light-gray rounded-2xl">
                        <p className="font-bold text-2xl">
                            [ 서비스 이용약관 및 개인정보 처리 방침 ]<br />
                            1. 서비스 이용자<br />
                            본 서비스를 이용하는 사람을 의미합니다.<br />
                            2. 개인정보 처리 방침<br />
                            개인정보를 어떻게 처리할것이냐... 그것은 바로 바로 요술로...<br />
                            1. 서비스 이용자<br />
                            본 서비스를 이용하는 사람을 의미합니다.<br />
                            2. 개인정보 처리 방침<br />
                            개인정보를 어떻게 처리할것이냐... 그것은 바로 바로 요술로...<br />
                            1. 서비스 이용자<br />
                            본 서비스를 이용하는 사람을 의미합니다.<br />
                            2. 개인정보 처리 방침<br />
                            개인정보를 어떻게 처리할것이냐... 그것은 바로 바로 요술로...<br />
                            1. 서비스 이용자<br />
                            본 서비스를 이용하는 사람을 의미합니다.<br />
                            2. 개인정보 처리 방침<br />
                            개인정보를 어떻게 처리할것이냐... 그것은 바로 바로 요술로...<br />
                            1. 서비스 이용자<br />
                            본 서비스를 이용하는 사람을 의미합니다.<br />
                            2. 개인정보 처리 방침<br />
                            개인정보를 어떻게 처리할것이냐... 그것은 바로 바로 요술로...<br />
                            1. 서비스 이용자<br />
                            본 서비스를 이용하는 사람을 의미합니다.<br />
                            2. 개인정보 처리 방침<br />
                            개인정보를 어떻게 처리할것이냐... 그것은 바로 바로 요술로...<br />
                        </p>
                    </div>
                </div>

            </main>
            <footer className="flex flex-wrap justify-center gap-4 self-center sm:self-end z-50">
                <button
                    onClick={() => {
                        goToNextStep(STEP.START);
                    }}
                    className="h-[90px] w-[250px] shrink-0 rounded-lg bg-primary-200 text-2xl font-semibold text-white transition-opacity hover:opacity-90"
                >
                    뒤로가기
                </button>
            </footer>
        </div>
    )
}
