'use client';

import { AlgorithmStep } from '@/lib/types';
import { useEffect, useRef } from 'react';

interface HashTableVisualizerProps {
    step: AlgorithmStep;
}

export default function HashTableVisualizer({ step }: HashTableVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !step.hashTable) return;

        const ctx = canvas.getContext('2d')!;
        const dpr = window.devicePixelRatio || 1;

        // Set canvas size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const bucketHeight = 50;
        const bucketWidth = 60;
        const startX = 50;
        const startY = 30;
        const gapY = 10;

        // Clear
        ctx.clearRect(0, 0, width, height);

        step.hashTable.forEach((bucket, i) => {
            const y = startY + i * (bucketHeight + gapY);

            // Draw Index Box
            ctx.fillStyle = '#1E1E2E';
            ctx.strokeStyle = '#4A4A7A';
            if (step.highlights?.includes(i)) {
                ctx.strokeStyle = '#F59E0B'; // Highlight accessed bucket
                ctx.lineWidth = 2;
                ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
                ctx.shadowBlur = 10;
            } else {
                ctx.lineWidth = 1;
                ctx.shadowBlur = 0;
            }

            ctx.fillRect(startX, y, bucketWidth, bucketHeight);
            ctx.strokeRect(startX, y, bucketWidth, bucketHeight);

            // Index Label
            ctx.fillStyle = '#E2E8F0';
            ctx.font = '14px "Chakra Petch", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(i.toString(), startX + bucketWidth / 2, y + bucketHeight / 2);

            // Draw Chain (Linked List)
            if (bucket.content) {
                // Arrow
                ctx.beginPath();
                ctx.moveTo(startX + bucketWidth, y + bucketHeight / 2);
                ctx.lineTo(startX + bucketWidth + 20, y + bucketHeight / 2);
                ctx.strokeStyle = '#64748B';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Draw Nodes
                const nodes = bucket.content.split(' → ');
                let curX = startX + bucketWidth + 20;

                nodes.forEach((val, ni) => {
                    // Node Box
                    ctx.fillStyle = '#312E81'; // Indigo
                    ctx.strokeStyle = '#6366F1';
                    ctx.fillRect(curX, y + 5, bucketWidth, bucketHeight - 10);
                    ctx.strokeRect(curX, y + 5, bucketWidth, bucketHeight - 10);

                    // Value
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillText(val, curX + bucketWidth / 2, y + bucketHeight / 2);

                    curX += bucketWidth;

                    // Arrow to next if exists
                    if (ni < nodes.length - 1) {
                        ctx.beginPath();
                        ctx.moveTo(curX, y + bucketHeight / 2);
                        ctx.lineTo(curX + 20, y + bucketHeight / 2);
                        ctx.stroke();
                        curX += 20;
                    }
                });
            }
        });

    }, [step]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ minHeight: '450px' }} // Taller for hash table
        />
    );
}
