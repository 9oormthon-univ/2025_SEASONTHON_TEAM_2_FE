import React from "react";
import Card from "../common/Card";
import SectionHeader from "../common/SectionHeader";
import { PeoplesIcon, OptionIconGreen } from "../../assets/icons/home";
import type { FamilyMember } from "../../types";

interface FamilyMembersCardProps {
    members: FamilyMember[];
}

const FamilyMembersCard: React.FC<FamilyMembersCardProps> = ({ members }) => {
    return (
        <Card className="h-[165px]">
            <SectionHeader icon={PeoplesIcon} title="귀여운 민서네" buttonIcon={OptionIconGreen} />
            <div className="flex justify-between">
                {members.map((member) => (
                    <div key={member.id} className="flex flex-col items-center gap-2 px-2">
                        <div className="size-12 bg-dark-gray rounded-full" /> {/* Placeholder for profile image */}
                        <p className="text-[#567D57] text-lg font-kccganpan">{member.name}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default FamilyMembersCard;