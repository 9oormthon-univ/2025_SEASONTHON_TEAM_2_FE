import { useNavigate } from "react-router-dom";
import { LinkIcon, PeoplesIcon, Xmark } from "../../assets/icons/home";
import SectionHeader from "../common/SectionHeader";

export default function FamilyManage() {
    const navigate = useNavigate();
    return (
        <div className="w-[965px] h-full bg-white rounded-2xl border border-[#D3D3D3]">
            <div className="relative w-full h-full overflow-hidden">
                <div className="absolute inset-6 p-4 bg-white rounded-2xl overflow-hidden flex flex-col z-9999">
                    <SectionHeader icon={PeoplesIcon} title="가족 관리" buttonIcon={Xmark} onButtonClick={() => navigate(-1)} />
                    <div className="grid grid-cols-2 p-8 gap-y-16">

                        {/* 가족 코드 */}
                        <div className="flex flex-col gap-4 justify-center items-center">
                            <div>
                                <h2 className="font-kccganpan text-3xl text-primary-300">생성한 가족 코드에요</h2>
                                <p className="font-gangwon text-3xl"><span className="text-point-color-orange">가족 코드는</span> 우리 가족 외에는 <span className="text-point-color-orange">비밀</span>이에요 쉿!</p>
                            </div>

                            <div>
                                <h2 className="font-kccganpan text-center tracking-widest text-6xl text-primary-300">000000</h2>
                            </div>

                            <div className="flex items-center justify-center bg-primary-100 w-[308px] h-[65px] border border-light-gray rounded-2xl relative">
                                <img src={LinkIcon} alt="link_icon" className="absolute left-11" />
                                <button className="font-bold text-xl text-white">
                                    초대 링크 복사하기
                                </button>
                            </div>
                        </div>

                        {/* 가족 이름 */}
                        <div className="font-kccganpan text-primary-300 text-center gap-8 flex flex-col">
                            <h2 className="text-3xl">우리 가족 이름은?</h2>
                            <p className="text-4xl">행복한 우리 가족</p>
                        </div>

                        {/* 가족 검증 질문 */}
                        <div className="text-3xl font-kccganpan col-span-full">
                            <h2 className="text-primary-300 mb-4">현재 가족 검증 질문이에요.</h2>
                            <ul className="text-primary-300 ml-4">
                                <li className="mb-4">Q. 질문 <span className="text-[#A78974]">우리 가족 구성원은 몇 명 인가요?</span></li>
                                <li>A. 답변 <span className="text-[#A78974]">
                                    4명
                                </span></li>
                            </ul>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}