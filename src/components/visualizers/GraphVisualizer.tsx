'use client';

import { AlgorithmStep } from '@/lib/types';
import { useEffect, useRef } from 'react';

interface GraphVisualizerProps {
    step: AlgorithmStep;
}

export default function GraphVisualizer({ step }: GraphVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const graph = step.graph;
        if (!graph) return;

        const ctx = canvas.getContext('2d')!;
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;

        ctx.clearRect(0, 0, width, height);

        // Scale graph to canvas
        const scaleX = width / 420;
        const scaleY = height / 350;

        // Draw edges
        graph.edges.forEach(edge => {
            const from = graph.nodes.find(n => n.id === edge.from)!;
            const to = graph.nodes.find(n => n.id === edge.to)!;

            const isTraversed = step.edges?.some(
                e => (e[0] === edge.from && e[1] === edge.to) || (e[0] === edge.to && e[1] === edge.from)
            );

            ctx.beginPath();
            ctx.moveTo(from.x * scaleX, from.y * scaleY);
            ctx.lineTo(to.x * scaleX, to.y * scaleY);
            ctx.strokeStyle = isTraversed ? '#7C3AED' : '#3A3A5C';
            ctx.lineWidth = isTraversed ? 3 : 1.5;

            if (isTraversed) {
                ctx.shadowColor = 'rgba(124, 58, 237, 0.5)';
                ctx.shadowBlur = 10;
            }

            ctx.stroke();
            ctx.shadowBlur = 0;
        });

        // Draw nodes
        graph.nodes.forEach(node => {
            const x = node.x * scaleX;
            const y = node.y * scaleY;
            const radius = 22;

            const isVisited = step.visited?.includes(node.id);
            const isCurrent = step.current === node.id;
            const isInQueue = step.queue?.includes(node.id);

            let fillColor = '#1E1E3F';
            let strokeColor = '#3A3A5C';
            let textColor = '#94A3B8';
            let glowColor = '';

            if (isVisited) {
                fillColor = '#1a1a4a';
                strokeColor = '#10B981';
                textColor = '#10B981';
                glowColor = 'rgba(16, 185, 129, 0.3)';
            }
            if (isInQueue) {
                fillColor = '#1a1a4a';
                strokeColor = '#F59E0B';
                textColor = '#F59E0B';
            }
            if (isCurrent) {
                fillColor = '#7C3AED';
                strokeColor = '#A78BFA';
                textColor = '#FFFFFF';
                glowColor = 'rgba(124, 58, 237, 0.5)';
            }

            if (glowColor) {
                ctx.shadowColor = glowColor;
                ctx.shadowBlur = 20;
            }

            // Circle
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = fillColor;
            ctx.fill();
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Label
            ctx.fillStyle = textColor;
            ctx.font = 'bold 16px "Chakra Petch", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.label, x, y);
        });

        // Draw queue/stack indicator
        if (step.queue && step.queue.length > 0) {
            ctx.fillStyle = '#64748B';
            ctx.font = '12px "Chakra Petch", sans-serif';
            ctx.textAlign = 'left';
            const label = step.description?.includes('DFS') || step.description?.includes('stack') ? 'Stack' : 'Queue';
            ctx.fillText(`${label}: [${step.queue.join(', ')}]`, 10, height - 10);
        }

    }, [step]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ minHeight: '280px' }}
        />
    );
}
