import { useQuery } from "@tanstack/react-query";
import { BookIcon, Xmark } from "../assets/icons/home";
import { getFamilyInfo } from "../api/auth/family";
import { NoteBG } from "../assets/icons";
import axiosInstance from "../api/axiosInstance";

const FamilyMemoDetail = () => {
    const { data: familyInfo } = useQuery({
        queryKey: ["familyInfo"],
        queryFn: getFamilyInfo
    });

    const { data: familyMemoData } = useQuery({
        queryKey: ["familyMemo"],
        queryFn: async () => {
            return await axiosInstance.get("/api/memo");
        }
    })
    console.log(familyMemoData);

    return (
        <div className="w-full h-[740px] bg-white rounded-2xl borde border-[#D3D3D3]">
            <div className="relative w-full h-full bg-transparent overflow-hidden">
                <div className="m-2 rounded-2xl overflow-hidden flex flex-col z-[9999]">
                    <div className="px-6 pt-6 pb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <img src={BookIcon} alt="" className="w-7 h-7" />
                                <h2 className="font-kccganpan text-[24px] text-[#49684A]">{familyInfo?.familyName} 가족 메모장</h2>
                            </div>
                            <button onClick={() => { }}>
                                <img src={Xmark} className="size-5" />
                            </button>
                        </div>
                    </div>

                    <div className="relative h-[517px] mt-4 w-full max-w-[891px] m-auto" style={{
                        backgroundImage: `url(${NoteBG})`
                    }}>
                        <img src={NoteBG} className="w-full absolute" />
                        {/* <div
                            className="w-[824px] h-full absolute inset-y-0 left-0 right-0 m-auto z-10 pointer-events-none bg-none"
                            style={{
                                backgroundImage: `repeating-linear-gradient(
                to bottom,
                transparent 0,
                transparent 50px,
                #B1B8C0 50px,
                #B1B8C0 51px
            )`,
                            }}
                        /> */}

                        <div className="px-8 pt-1 pb-6 flex-1 overflow-y-auto relative">
                            <textarea
                                className="w-full h-[700px] focus:outline-none font-gangwon text-[26px] text-dark-gray z-20 relative bg-transparent"
                                style={{
                                    lineHeight: '51px',
                                    resize: 'none',
                                }}
                            >
                                Netflix 아이디, 비밀번호 : minseo0217@naver.com / rockyminseo!

                                엄마 - 책상 위 비타민, 유산균 챙겨먹기!!

                                아빠 - 일 나갈 때 안방 화장대 위 선크림 꼭 바르기!!!
                            </textarea>
                        </div>
                    </div>
                    <button className="absolute right-8 bottom-8 bg-primary-200 text-white font-bold text-2xl rounded-2xl w-[215px] h-[59px] flex items-center justify-center">
                        저장하기
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FamilyMemoDetail;