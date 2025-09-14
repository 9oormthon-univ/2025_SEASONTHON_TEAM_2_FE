import { useQuery } from "@tanstack/react-query";
import { getMyFamilyMembers } from "../../api/auth/family";
import LoadingSpinner from "../LoadingSpinner";
import { PeoplesIcon } from "../../assets/icons/home";

type FamilyMember = {
    id: number;
    nickname: string;
    profileUrl: string;
};

type FamilyData = {
    familyName: string;
    members: FamilyMember[];
};

export default function MobileFamilyMembersCard() {
    const { data, isLoading, isError } = useQuery<FamilyData>({
        queryKey: ["my-family-members"],
        queryFn: getMyFamilyMembers,
    });

    const familyName = data?.familyName ?? "우리 가족";

    const members: FamilyMember[] = data?.members ?? [];


    return (
        <section className="w-full">
            <h3 className="text-[20px] font-semibold mb-2">우리 가족</h3>

            <div className="rounded-2xl rounded-tl-none bg-white p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <img src={PeoplesIcon} alt="" className="w-6 h-6" />
                        <span className="text-[20px] font-bold">{familyName}</span>
                    </div>
                </div>

                {isLoading ? (
                    <div className="py-8">
                        <LoadingSpinner size={28} text="가족들이 찾아오고 있어요..." />
                    </div>
                ) : isError ? (
                    <p className="py-6 text-center text-red-500 text-sm">
                        가족 정보를 불러오는 데 실패했어요.
                    </p>
                ) : data && data.members.length === 0 ? (
                    <p className="py-6 text-center text-gray-500 text-sm">
                        아직 등록된 가족이 없어요.
                    </p>
                ) : (
                    // 멤버
                    <div className="mt-1 grid grid-cols-4 gap-y-2">
                        {members.map((m) => (
                            <div key={m.id} className="flex flex-col items-center gap-2">
                                {m.profileUrl ? (
                                    <img
                                        src={m.profileUrl}
                                        alt={`${m.nickname} 프로필`}
                                        className="w-12 h-12 rounded-full object-cover bg-gray-200"
                                    />
                                ) : (
                                    <div className="w-14 h-14 rounded-full bg-gray-300" />
                                )}
                                <span className="text-[#567D57] font-pretendard font-semibold text-[18px] leading-none">
                  {m.nickname || " "}
                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
