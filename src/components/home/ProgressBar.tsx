export default function ProgressBar({ percentage }: { percentage: number }) {
    const clampedPercentage = Math.max(0, Math.min(100, percentage));

    return (
        <div className="relative w-full max-w-[500px]">
            <div
                className="w-[41px] h-[16px] absolute mb-2 -top-8 transform -translate-x-1/2"
                style={{ left: `${clampedPercentage}%` }}
            >
                <div className="relative text-center py-1 text-xs text-primary-300 bg-[#ECF5F1] border border-primary-200 rounded-md">
                    <span className="font-kccganpan">{clampedPercentage}%</span>
                    <div className="absolute left-1/2 w-2 h-2 bg-[#ECF5F1] border-b border-r border-primary-200 transform -translate-x-1/2 rotate-45" style={{ bottom: '-5px' }} />
                </div>
            </div>

            <div className="w-full h-2 bg-light-gray rounded-full">
                <div
                    className="h-full bg-primary-300 rounded-full"
                    style={{ width: `${clampedPercentage}%` }
                    }
                />
            </div>
        </div>
    );
}

