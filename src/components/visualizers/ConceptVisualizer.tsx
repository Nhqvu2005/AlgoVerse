'use client';

import { AlgorithmStep } from '@/lib/types';

interface ConceptVisualizerProps {
    step: AlgorithmStep;
}

export default function ConceptVisualizer({ step }: ConceptVisualizerProps) {
    if (!step.variables) {
        return (
            <div className="flex items-center justify-center h-full text-text-muted">
                No active variables to display
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
                {Object.entries(step.variables).map(([key, value]) => (
                    <div
                        key={key}
                        className="glass p-6 rounded-xl border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-colors"
                    >
                        {/* Background glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Variable Name */}
                        <div className="text-text-secondary text-sm font-code mb-2 uppercase tracking-wider">
                            {key}
                        </div>

                        {/* Variable Value */}
                        <div className="flex items-center gap-3">
                            <div className="text-3xl md:text-4xl font-heading text-white tracking-tight">
                                {typeof value === 'string' && value.startsWith('"') ? (
                                    <span className="text-accent">{value}</span>
                                ) : typeof value === 'boolean' ? (
                                    <span className={value ? 'text-success' : 'text-danger'}>{String(value)}</span>
                                ) : (
                                    <span className="text-primary">{value}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
