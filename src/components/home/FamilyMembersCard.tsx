import React from "react";
import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import { PeoplesIcon, OptionIconGreen } from "../../assets/icons/home";
import type { FamilyMember } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { getMyFamilyMembers } from "../../api/auth/family";

interface FamilyMembersCardProps {
    members: FamilyMember[];
}

const countLength = (name: string) => {
    return name.length;
}

const FamilyMembersCard: React.FC<FamilyMembersCardProps> = ({ members }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["my-family-members"],
        queryFn: getMyFamilyMembers
    });
    console.log(data);

    return (
        <Card className="h-fit">
            <SectionHeader icon={PeoplesIcon} title="귀여운 민서네" buttonIcon={OptionIconGreen} />
            <div className="justify-between grid grid-cols-4 gap-y-2">
                {data?.members.map((member, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 px-2">
                        {/* <img src={member.profileUrl} alt={`${member.nickname}'s profile_img`} className="size-12 rounded-full" /> */}
                        <div className="size-12 bg-dark-gray rounded-full" />
                        <p className="text-[#567D57] text-center font-kccganpan text-sm">{member.nickname}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default FamilyMembersCard;