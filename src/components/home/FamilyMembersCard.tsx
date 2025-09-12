import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import { PeoplesIcon, OptionIconGreen } from "../../assets/icons/home";
import { useQuery } from "@tanstack/react-query";
import { getMyFamilyMembers } from "../../api/auth/family";
import LoadingSpinner from "../LoadingSpinner";
import { useNavigate } from "react-router-dom";

const FamilyMembersCard = () => {
    const navigate = useNavigate();

    // 개선 1: isError, error 상태 추가
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["my-family-members"],
        queryFn: getMyFamilyMembers,
    });

    // 로딩 및 에러 상태를 먼저 처리하는 'Early Return' 패턴 적용
    if (isLoading) {
        return (
            <Card className="h-fit">
                <SectionHeader icon={PeoplesIcon} title="우리 가족" buttonIcon={OptionIconGreen} />
                <LoadingSpinner text="가족들이 찾아오고 있어요!" size={32} />
            </Card>
        );
    }

    if (isError) {
        console.error("가족 정보 로딩 실패:", error);
        return (
            <Card className="h-fit">
                <SectionHeader icon={PeoplesIcon} title="오류" buttonIcon={OptionIconGreen} />
                <p className="text-center text-red-500">가족 정보를 불러오는 데 실패했습니다.</p>
            </Card>
        );
    }

    return (
        <Card className="h-fit">
            <SectionHeader
                icon={PeoplesIcon}
                title={data?.familyName || "우리 가족"}
                buttonIcon={OptionIconGreen}
                onButtonClick={() => navigate("family/manage")}
            />
            {/* 개선 2: 데이터가 없거나 멤버가 0명일 경우 빈 상태(Empty State) UI 표시 */}
            {!data || data.members.length === 0 ? (
                <p className="text-center text-gray-500">아직 등록된 가족이 없어요.</p>
            ) : (
                <div className="justify-between grid grid-cols-4 gap-y-2">
                    {data.members.map((member) => (
                        // 개선 3: key prop을 index 대신 고유한 member.id로 변경 (매우 중요!)
                        <div key={member.id} className="flex flex-col items-center gap-2 px-2">
                            <img
                                src={member.profileUrl}
                                alt={`${member.nickname}'s profile_img`}
                                className="size-12 rounded-full"
                            />
                            <p className="text-[#567D57] text-center font-kccganpan text-sm">{member.nickname}</p>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default FamilyMembersCard;