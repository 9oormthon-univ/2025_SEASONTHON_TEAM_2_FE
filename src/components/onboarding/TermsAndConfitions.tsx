import { STEP, type StepProps } from "../../types/onboarding.types"

export const TermsAndConfitions: React.FC<StepProps> = ({ goToNextStep }) => {
    return (
        <div className="flex min-h-screen flex-col justify-between px-8 sm:px-16 md:px-28 pb-20 pt-35 w-full max-w-[1000px] mx-auto">
            <main>
                <div className="flex flex-col gap-6">
                    <h1 className="text-2xl font-semibold text-center text-primary-300">
                        서비스 이용 약관 상세보기 페이지
                    </h1>
                    <div className="overflow-scroll p-5 w-full h-[465px] bg-white border border-light-gray rounded-2xl">
                        <div className="text-sm leading-relaxed">
                            <h3 className="font-bold text-lg mb-4">서비스 이용약관</h3>

                            <div className="mb-6">
                                <h4 className="font-bold text-base mb-2">제1조 (목적)</h4>
                                <p className="mb-3">이 약관은 Everflow 서비스의 이용과 관련하여 회사와 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-bold text-base mb-2">제2조 (정의)</h4>
                                <p className="mb-2">이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
                                <ol className="list-decimal list-inside ml-4 space-y-1">
                                    <li>"서비스"라 함은 가족 간의 소통과 추억 공유를 위한 Everflow 웹 서비스 및 관련 기능을 의미합니다.</li>
                                    <li>"회원"이라 함은 이 약관에 동의하고 Everflow 서비스에 가입하여 서비스를 이용하는 개인을 말합니다.</li>
                                    <li>"가족 그룹"이라 함은 서로 연결된 회원들로 구성된 가족 단위의 그룹을 의미합니다.</li>
                                    <li>"가족 코드"라 함은 가족 그룹에 참여하기 위해 사용하는 고유한 식별 번호를 의미합니다.</li>
                                    <li>"콘텐츠"라 함은 회원이 서비스를 통해 게시, 업로드, 공유하는 텍스트, 사진, 영상, 음성 등 모든 형태의 정보를 의미합니다.</li>
                                    <li>"오늘의 질문"이라 함은 서비스에서 제공하는 가족 간 소통을 위한 일일 질문 기능을 의미합니다.</li>
                                    <li>"가족 책장"이라 함은 가족 구성원들이 함께 작성하고 공유하는 추억과 이야기를 보관하는 공간을 의미합니다.</li>
                                </ol>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-bold text-base mb-2">제3조 (약관의 게시와 개정)</h4>
                                <ol className="list-decimal list-inside space-y-2">
                                    <li>"회사"는 이 약관의 내용을 "회원"이 쉽게 알 수 있도록 서비스 초기 화면에 게시하고, "회원"이 이 약관에 동의함으로써 이 약관의 효력이 발생합니다.</li>
                                    <li>이 약관의 적용기간은 회원이 서비스의 이용을 신청한 때로부터 이용 계약을 해지한 날까지로 규정합니다.</li>
                                    <li>이 약관에 동의하는 것은 정기적으로 홈페이지를 방문하여 약관의 변경 사항을 확인하는 것에 동의하는 것을 의미합니다.</li>
                                    <li>"회사"는 관련법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
                                    <li>"회사"가 전항에 따라 개정약관을 공지 또는 통지하면서 "회원"에게 30일 기간 내에 의사표시를 하지 않으면 의사표시가 표명된 것으로 봅니다.</li>
                                    <li>회원은 변경된 약관의 적용을 거부할 권리가 있습니다.</li>
                                    <li>이 약관의 일부가 집행 불능으로 판단되더라도 나머지 부분은 계속해서 효력을 갖습니다.</li>
                                </ol>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-bold text-base mb-2">제4조 (약관의 해석)</h4>
                                <ol className="list-decimal list-inside space-y-1">
                                    <li>"회사"는 개별 서비스에 대해서는 별도의 이용약관 및 운영정책을 둘 수 있으며, 해당 내용이 이 약관과 상충할 경우에는 "운영정책 등"이 우선하여 적용됩니다.</li>
                                    <li>이 약관에서 정하지 아니한 사항이나 해석에 대해서는 "운영정책 등" 및 관계법령 또는 상관례에 따릅니다.</li>
                                </ol>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-bold text-base mb-2">제5조 (서비스 가입 및 가족 그룹 생성)</h4>
                                <ol className="list-decimal list-inside space-y-1">
                                    <li>회원은 카카오 소셜 로그인을 통해 서비스에 가입할 수 있습니다.</li>
                                    <li>회원은 새로운 가족 그룹을 생성하거나 기존 가족 그룹에 참여할 수 있습니다.</li>
                                    <li>가족 그룹 참여 시에는 가족 코드와 가족 구성원 확인 질문에 대한 답변이 필요합니다.</li>
                                    <li>가족 그룹장의 승인을 통해 가족 그룹 참여가 최종 확정됩니다.</li>
                                </ol>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-bold text-base mb-2">제10조 ("회원"의 의무)</h4>
                                <p className="mb-2">"회원"은 다음 행위를 하여서는 안 됩니다.</p>
                                <ol className="list-decimal list-inside ml-4 space-y-1 text-xs">
                                    <li>허위 정보로 가입하거나 타인의 정보를 도용하는 행위</li>
                                    <li>가족이 아닌 사람을 가족 그룹에 초대하거나 참여시키는 행위</li>
                                    <li>가족 구성원에게 불쾌감을 주는 콘텐츠를 게시하는 행위</li>
                                    <li>서비스의 본래 목적인 가족 간 소통과 다른 용도로 사용하는 행위</li>
                                    <li>다른 가족의 개인정보나 콘텐츠를 무단으로 수집, 공유하는 행위</li>
                                    <li>서비스를 상업적 목적으로 이용하는 행위</li>
                                    <li>기타 법령이나 공서양속에 위반되는 행위</li>
                                </ol>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-bold text-base mb-2">제11조 ("서비스"의 제공 등)</h4>
                                <p className="mb-2">회사는 회원에게 아래와 같은 서비스를 제공합니다.</p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li>가족 그룹 생성 및 관리 기능</li>
                                    <li>오늘의 질문을 통한 가족 간 소통 기능</li>
                                    <li>가족 책장을 통한 추억과 이야기 공유 기능</li>
                                    <li>가족 구성원 간의 메시지 및 콘텐츠 공유 기능</li>
                                    <li>가족 일정 및 이벤트 관리 기능</li>
                                    <li>기타 가족 간 유대감 증진을 위한 부가 서비스</li>
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-bold text-base mb-2">제12조 (콘텐츠 및 개인정보)</h4>
                                <ol className="list-decimal list-inside space-y-1">
                                    <li>회원이 업로드한 콘텐츠의 저작권은 해당 회원에게 있으며, 가족 그룹 내에서만 공유됩니다.</li>
                                    <li>회원은 가족 그룹 탈퇴 시 본인이 업로드한 콘텐츠의 삭제를 요청할 수 있습니다.</li>
                                    <li>서비스는 가족 구성원 간의 프라이버시를 보호하며, 다른 가족 그룹과 콘텐츠를 공유하지 않습니다.</li>
                                    <li>회원의 개인정보는 관련 법령에 따라 안전하게 보호됩니다.</li>
                                </ol>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-bold text-base mb-2">제13조 (가족 그룹 관리)</h4>
                                <ol className="list-decimal list-inside space-y-1">
                                    <li>가족 그룹장은 그룹원의 참여 승인 및 그룹 관리 권한을 가집니다.</li>
                                    <li>가족 구성원은 언제든지 가족 그룹에서 탈퇴할 수 있습니다.</li>
                                    <li>가족 그룹 탈퇴 시 해당 회원의 계정은 휴면 상태로 전환됩니다.</li>
                                    <li>30일 이상 비활성 상태인 계정의 콘텐츠는 자동으로 삭제될 수 있습니다.</li>
                                </ol>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-bold text-base mb-2">제18조 (책임제한)</h4>
                                <ol className="list-decimal list-inside space-y-1">
                                    <li>"회사"는 천재지변 또는 이에 준하는 불가항력으로 인하여 "서비스"를 제공할 수 없는 경우에는 "서비스" 제공에 관한 책임이 면제됩니다.</li>
                                    <li>"회사"는 "회원"의 귀책사유로 인한 "서비스" 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
                                    <li>"회사"는 무료로 제공되는 서비스 이용과 관련하여 관련법에 특별한 규정이 없는 한 책임을 지지 않습니다.</li>
                                </ol>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-bold text-base mb-2">제20조 (준거법 및 재판관할)</h4>
                                <ol className="list-decimal list-inside space-y-1">
                                    <li>"회사"와 "회원" 간 제기된 소송은 대한민국법을 준거법으로 합니다.</li>
                                    <li>"회사"와 "회원" 간 발생한 분쟁에 대하여는 관련 법령에 의한 절차에 따른 법원을 제1심 관할 법원으로 합니다.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="flex flex-wrap justify-center gap-4 self-center sm:self-end z-50 mt-10">
                <button
                    onClick={() => {
                        goToNextStep(STEP.START);
                    }}
                    className="h-[80px] w-[250px] shrink-0 rounded-2xl bg-primary-200 text-2xl font-semibold text-white transition-opacity hover:opacity-90"
                >
                    뒤로가기
                </button>
            </footer>
        </div>
    )
}
