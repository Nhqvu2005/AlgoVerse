'use client';

interface ControlPanelProps {
    isPlaying: boolean;
    currentStep: number;
    totalSteps: number;
    speed: number;
    onPlay: () => void;
    onPause: () => void;
    onStepForward: () => void;
    onStepBackward: () => void;
    onReset: () => void;
    onSpeedChange: (speed: number) => void;
}

export default function ControlPanel({
    isPlaying,
    currentStep,
    totalSteps,
    speed,
    onPlay,
    onPause,
    onStepForward,
    onStepBackward,
    onReset,
    onSpeedChange,
}: ControlPanelProps) {
    const progress = totalSteps > 0 ? (currentStep / (totalSteps - 1)) * 100 : 0;

    return (
        <div className="glass rounded-xl p-4 space-y-4">
            {/* Progress bar */}
            <div className="relative">
                <div className="h-1.5 bg-darker rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-200"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="flex justify-between mt-1.5">
                    <span className="text-xs text-text-muted">Bước {currentStep + 1}</span>
                    <span className="text-xs text-text-muted">/ {totalSteps}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-2">
                <button onClick={onReset} className="btn-icon" title="Reset">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>

                <button onClick={onStepBackward} className="btn-icon" title="Bước trước" disabled={currentStep <= 0}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={isPlaying ? onPause : onPlay}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center
                     shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
                    title={isPlaying ? 'Tạm dừng' : 'Chạy'}
                >
                    {isPlaying ? (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>

                <button onClick={onStepForward} className="btn-icon" title="Bước tiếp" disabled={currentStep >= totalSteps - 1}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <div className="w-px h-8 bg-white/10 mx-1" />

                {/* Speed control */}
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <input
                        type="range"
                        min="0.25"
                        max="3"
                        step="0.25"
                        value={speed}
                        onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                        className="w-20 h-1.5 accent-primary bg-darker rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                       [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                    <span className="text-xs text-text-muted w-8">{speed}x</span>
                </div>
            </div>
        </div>
    );
}
