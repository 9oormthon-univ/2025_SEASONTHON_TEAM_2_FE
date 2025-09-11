interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
    <div className={`flex flex-col gap-4 bg-white border border-light-gray p-4 rounded-2xl ${className}`}>
        {children}
    </div>
);

export default Card;