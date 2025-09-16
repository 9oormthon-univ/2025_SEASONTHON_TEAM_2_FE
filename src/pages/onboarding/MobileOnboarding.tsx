import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../../components/mobile/MobileHeader.tsx";

export default function MobileOnboarding() {
    const [showTerms, setShowTerms] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate();

    const handleNext = () => {
        if (agreed) {
            navigate("/mobile/user-info");
        }
    };

    return (
        <div className="w-full min-h-screen max-w-[430px] mx-auto bg-white flex flex-col">
            <MobileHeader />

            <div className="justify-center flex-1 px-6 pt-10">
                <div className="flex flex-col mb-10">
                    <h2 className="text-[25px] font-semibold mt-20 mb-3">
                        우리 가족의 대화가 흐르는 곳,<br />Everflow에 오신 걸 환영합니다!
                    </h2>
                    <p className="text-[18px] font-normal">
                        함께라서 소중한 우리 가족의 이야기를 기록해보세요 :)
                    </p>
                </div>

                {/* 약관 토글 */}
                <div className="mb-4">
                    <button
                        type="button"
                        onClick={() => setShowTerms((prev) => !prev)}
                        className="underline text-primary-300 font-medium"
                    >
                        서비스 이용 약관
                    </button>
                    {showTerms && (
                        <div className="mt-3 h-[300px] overflow-y-scroll border border-gray-300 rounded-lg p-4 text-[14px] leading-relaxed text-gray-700 space-y-3">
                            <h3 className="font-semibold text-[16px] mb-2">서비스 이용약관</h3>

                            <p>
                                <strong>제1조 (목적)</strong><br />
                                이 약관은 Everflow 서비스의 이용과 관련하여 회사와 회원과의 권리,
                                의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                            </p>

                            <p>
                                <strong>제2조 (정의)</strong><br />
                                "서비스"라 함은 가족 간의 소통과 추억 공유를 위한 Everflow 웹 서비스 및 관련 기능을 의미합니다.<br />
                                "회원"이라 함은 이 약관에 동의하고 Everflow 서비스에 가입하여 서비스를 이용하는 개인을 말합니다.<br />
                                "가족 그룹"이라 함은 서로 연결된 회원들로 구성된 가족 단위의 그룹을 의미합니다.<br />
                                "가족 코드"라 함은 가족 그룹에 참여하기 위해 사용하는 고유한 식별 번호를 의미합니다.<br />
                                "콘텐츠"라 함은 회원이 서비스를 통해 게시, 업로드, 공유하는 텍스트, 사진, 영상, 음성 등 모든 형태의 정보를 의미합니다.<br />
                                "오늘의 질문"이라 함은 서비스에서 제공하는 가족 간 소통을 위한 일일 질문 기능을 의미합니다.<br />
                                "가족 책장"이라 함은 가족 구성원들이 함께 작성하고 공유하는 추억과 이야기를 보관하는 공간을 의미합니다.
                            </p>

                            <p>
                                <strong>제3조 (약관의 게시와 개정)</strong><br />
                                "회사"는 이 약관의 내용을 "회원"이 쉽게 알 수 있도록 서비스 초기 화면에 게시하고, "회원"이 이 약관에 동의함으로써 이 약관의 효력이 발생합니다.<br />
                                이 약관의 적용기간은 회원이 서비스의 이용을 신청한 때로부터 이용 계약을 해지한 날까지로 규정합니다.<br />
                                "회사"는 관련법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.<br />
                                개정 시 "회원"에게 30일 내 의사표시가 없으면 동의한 것으로 간주합니다.
                            </p>

                            <p>
                                <strong>제4조 (약관의 해석)</strong><br />
                                "회사"는 개별 서비스에 대해서는 별도의 이용약관 및 운영정책을 둘 수 있으며, 해당 내용이 이 약관과 상충할 경우에는 "운영정책 등"이 우선하여 적용됩니다.<br />
                                이 약관에서 정하지 아니한 사항이나 해석에 대해서는 "운영정책 등" 및 관계법령 또는 상관례에 따릅니다.
                            </p>

                            <p>
                                <strong>제5조 (서비스 가입 및 가족 그룹 생성)</strong><br />
                                회원은 카카오 소셜 로그인을 통해 서비스에 가입할 수 있습니다.<br />
                                회원은 새로운 가족 그룹을 생성하거나 기존 가족 그룹에 참여할 수 있습니다.<br />
                                가족 그룹 참여 시에는 가족 코드와 가족 구성원 확인 질문에 대한 답변이 필요합니다.<br />
                                가족 그룹장의 승인을 통해 가족 그룹 참여가 최종 확정됩니다.
                            </p>

                            <p>
                                <strong>제10조 ("회원"의 의무)</strong><br />
                                "회원"은 다음 행위를 하여서는 안 됩니다.<br />
                                - 허위 정보로 가입하거나 타인의 정보를 도용하는 행위<br />
                                - 가족이 아닌 사람을 가족 그룹에 초대하거나 참여시키는 행위<br />
                                - 가족 구성원에게 불쾌감을 주는 콘텐츠를 게시하는 행위<br />
                                - 서비스의 본래 목적인 가족 간 소통과 다른 용도로 사용하는 행위<br />
                                - 다른 가족의 개인정보나 콘텐츠를 무단으로 수집, 공유하는 행위<br />
                                - 서비스를 상업적 목적으로 이용하는 행위<br />
                                - 기타 법령이나 공서양속에 위반되는 행위
                            </p>

                            <p>
                                <strong>제11조 ("서비스"의 제공 등)</strong><br />
                                회사는 회원에게 아래와 같은 서비스를 제공합니다.<br />
                                - 가족 그룹 생성 및 관리 기능<br />
                                - 오늘의 질문을 통한 가족 간 소통 기능<br />
                                - 가족 책장을 통한 추억과 이야기 공유 기능<br />
                                - 가족 구성원 간의 메시지 및 콘텐츠 공유 기능<br />
                                - 가족 일정 및 이벤트 관리 기능<br />
                                - 기타 가족 간 유대감 증진을 위한 부가 서비스
                            </p>

                            <p>
                                <strong>제12조 (콘텐츠 및 개인정보)</strong><br />
                                회원이 업로드한 콘텐츠의 저작권은 해당 회원에게 있으며, 가족 그룹 내에서만 공유됩니다.<br />
                                회원은 가족 그룹 탈퇴 시 본인이 업로드한 콘텐츠의 삭제를 요청할 수 있습니다.<br />
                                서비스는 가족 구성원 간의 프라이버시를 보호하며, 다른 가족 그룹과 콘텐츠를 공유하지 않습니다.<br />
                                회원의 개인정보는 관련 법령에 따라 안전하게 보호됩니다.
                            </p>

                            <p>
                                <strong>제13조 (가족 그룹 관리)</strong><br />
                                가족 그룹장은 그룹원의 참여 승인 및 그룹 관리 권한을 가집니다.<br />
                                가족 구성원은 언제든지 가족 그룹에서 탈퇴할 수 있습니다.<br />
                                30일 이상 비활성 상태인 계정의 콘텐츠는 자동으로 삭제될 수 있습니다.
                            </p>

                            <p>
                                <strong>제18조 (책임제한)</strong><br />
                                "회사"는 천재지변 등 불가항력으로 인하여 "서비스"를 제공할 수 없는 경우 책임이 면제됩니다.<br />
                                "회사"는 회원의 귀책사유로 인한 장애에 책임지지 않습니다.<br />
                                무료 서비스에 대해서는 특별 규정이 없는 한 책임지지 않습니다.
                            </p>

                            <p>
                                <strong>제20조 (준거법 및 재판관할)</strong><br />
                                "회사"와 "회원" 간 제기된 소송은 대한민국법을 준거법으로 합니다.<br />
                                관련 법령에 의한 절차에 따른 법원을 제1심 관할 법원으로 합니다.
                            </p>
                        </div>
                    )}
                </div>

                {/* 체크박스 */}
                <div className="flex items-center gap-2 mt-3">
                    <input
                        type="checkbox"
                        id="agree"
                        checked={agreed}
                        onChange={() => setAgreed((prev) => !prev)}
                        className="w-5 h-5 rounded border-gray-400"
                    />
                    <label htmlFor="agree" className="text-[16px] text-gray-700">
                        서비스 이용 약관에 동의합니다 (필수)
                    </label>
                </div>
            </div>

            <div className="px-6 pb-8">
                <button
                    type="button"
                    onClick={handleNext}
                    disabled={!agreed}
                    className={`w-full rounded-2xl text-white text-[20px] font-semibold py-4 mb-10 ${
                        agreed
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
