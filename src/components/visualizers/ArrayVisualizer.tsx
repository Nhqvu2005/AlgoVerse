'use client';

import { AlgorithmStep } from '@/lib/types';
import { useEffect, useRef } from 'react';

interface ArrayVisualizerProps {
    step: AlgorithmStep;
    maxValue?: number;
}

export default function ArrayVisualizer({ step, maxValue: propMax }: ArrayVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !step.array) return;

        const ctx = canvas.getContext('2d')!;
        const dpr = window.devicePixelRatio || 1;

        // Set canvas size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const arr = step.array;
        const n = arr.length;
        const maxVal = propMax || Math.max(...arr, 1);
        const padding = 20;
        const barGap = Math.max(2, Math.min(6, 60 / n));
        const barWidth = Math.max(8, (width - padding * 2 - barGap * (n - 1)) / n);
        const maxBarHeight = height - padding * 2 - 30; // leave room for labels

        // Clear
        ctx.clearRect(0, 0, width, height);

        // Draw bars
        arr.forEach((val, i) => {
            const x = padding + i * (barWidth + barGap);
            const barHeight = (val / maxVal) * maxBarHeight;
            const y = height - padding - barHeight;

            // Determine color
            let color = '#4A4A7A'; // default
            let glowColor = '';

            if (step.sorted?.includes(i)) {
                color = '#10B981'; // green - sorted
                glowColor = 'rgba(16, 185, 129, 0.3)';
            }
            if (step.highlights?.includes(i)) {
                color = '#7C3AED'; // purple - comparing
                glowColor = 'rgba(124, 58, 237, 0.4)';
            }
            if (step.swapping?.includes(i)) {
                color = '#F43F5E'; // pink - swapping
                glowColor = 'rgba(244, 63, 94, 0.4)';
            }
            if (step.found === i) {
                color = '#06B6D4'; // cyan - found
                glowColor = 'rgba(6, 182, 212, 0.5)';
            }
            if (step.pivot === i) {
                color = '#F59E0B'; // yellow - pivot
                glowColor = 'rgba(245, 158, 11, 0.4)';
            }

            // Binary search range indicators
            if (step.low !== undefined && step.high !== undefined) {
                if (i < step.low || i > step.high) {
                    color = '#1E1E3F'; // dim out-of-range
                }
                if (i === step.mid) {
                    color = '#F59E0B';
                    glowColor = 'rgba(245, 158, 11, 0.4)';
                }
            }

            // Glow effect
            if (glowColor) {
                ctx.shadowColor = glowColor;
                ctx.shadowBlur = 15;
            }

            // Draw bar with rounded top
            ctx.fillStyle = color;
            ctx.beginPath();
            const radius = Math.min(4, barWidth / 3);
            ctx.moveTo(x, y + barHeight);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.lineTo(x + barWidth - radius, y);
            ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
            ctx.lineTo(x + barWidth, y + barHeight);
            ctx.closePath();
            ctx.fill();

            ctx.shadowBlur = 0;

            // Value label
            ctx.fillStyle = '#E2E8F0';
            ctx.font = `${Math.min(12, barWidth - 2)}px "Chakra Petch", sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillText(val.toString(), x + barWidth / 2, y - 6);

            // Index label
            ctx.fillStyle = '#64748B';
            ctx.font = `${Math.min(10, barWidth - 2)}px "Chakra Petch", sans-serif`;
            ctx.fillText(i.toString(), x + barWidth / 2, height - 5);
        });

        // Draw search target if present
        if (step.searchTarget !== undefined) {
            ctx.fillStyle = '#06B6D4';
            ctx.font = 'bold 14px "Chakra Petch", sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(`Target: ${step.searchTarget}`, width - padding, 20);
        }

    }, [step, propMax]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ minHeight: '280px' }}
        />
    );
}
