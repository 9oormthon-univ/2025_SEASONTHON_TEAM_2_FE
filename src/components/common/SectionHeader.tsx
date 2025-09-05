interface SectionHeaderProps {
    icon: string;
    title: string;
    buttonIcon?: string;
    onButtonClick?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, buttonIcon, onButtonClick }) => (
    <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
            <img src={icon} alt={`${title} 아이콘`} className="size-8" />
            <p className="text-primary-300 text-2xl font-kccganpan">{title}</p>
        </div>
        {buttonIcon && (
            <button onClick={onButtonClick} aria-label={`${title} 옵션`}>
                <img src={buttonIcon} alt="옵션 버튼 아이콘" className="size-8" />
            </button>
        )}
    </div>
);

export default SectionHeader;