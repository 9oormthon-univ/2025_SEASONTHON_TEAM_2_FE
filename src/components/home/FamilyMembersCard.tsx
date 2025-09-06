import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import { PeoplesIcon, OptionIconGreen } from "../../assets/icons/home";
import { useQuery } from "@tanstack/react-query";
import { getMyFamilyMembers } from "../../api/auth/family";
import LoadingSpinner from "../LoadingSpinner";
import { useNavigate } from "react-router-dom";

const FamilyMembersCard = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ["my-family-members"],
        queryFn: getMyFamilyMembers
    });

    return (
        <Card className="h-fit">
            <SectionHeader icon={PeoplesIcon} title="귀여운 민서네" buttonIcon={OptionIconGreen} onButtonClick={() => navigate("family/manage")} />
            {isLoading ? (
                <LoadingSpinner text="가족들이 찾아오고 있어요!" size={32} />
            ) : (
                <div className="justify-between grid grid-cols-4 gap-y-2">
                    {data?.members.map((member, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 px-2">
                            <img src={member.profileUrl} alt={`${member.nickname}'s profile_img`} className="size-12 rounded-full" />
                            <p className="text-[#567D57] text-center font-kccganpan text-sm">{member.nickname}</p>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default FamilyMembersCard;