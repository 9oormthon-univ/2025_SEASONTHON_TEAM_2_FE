export default function LoadingSpinner({ text = "데이터 불러오는 중", size = 16 }: { text?: string, size?: number }) {
    return (
        <div className="flex flex-col animate-pulse gap-4 justify-center items-center h-full">
            <div style={{ width: `${size}px`, height: `${size}px` }} className="animate-spin rounded-full border-l-2 border-primary-200/90" />
            <p>{text}...</p>
        </div>
    )
}