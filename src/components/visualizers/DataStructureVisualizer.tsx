'use client';

import { AlgorithmStep } from '@/lib/types';
import { useEffect, useRef } from 'react';

interface DataStructureVisualizerProps {
    step: AlgorithmStep;
    type: 'stack' | 'queue' | 'linkedList' | 'tree';
}

export default function DataStructureVisualizer({ step, type }: DataStructureVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d')!;
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const w = rect.width;
        const h = rect.height;
        ctx.clearRect(0, 0, w, h);

        if (type === 'stack') drawStack(ctx, w, h, step);
        else if (type === 'queue') drawQueue(ctx, w, h, step);
        else if (type === 'linkedList') drawLinkedList(ctx, w, h, step);
        else if (type === 'tree') drawTree(ctx, w, h, step);
    }, [step, type]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ minHeight: '280px' }}
        />
    );
}

function drawStack(ctx: CanvasRenderingContext2D, w: number, h: number, step: AlgorithmStep) {
    const items = step.stack || [];
    const boxW = 80;
    const boxH = 40;
    const x = w / 2 - boxW / 2;
    const startY = h - 40;

    // Draw container
    ctx.strokeStyle = '#3A3A5C';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const containerH = Math.max(items.length, 6) * (boxH + 4) + 20;
    ctx.moveTo(x - 10, startY + 5);
    ctx.lineTo(x - 10, startY - containerH);
    ctx.moveTo(x + boxW + 10, startY + 5);
    ctx.lineTo(x + boxW + 10, startY - containerH);
    ctx.moveTo(x - 10, startY + 5);
    ctx.lineTo(x + boxW + 10, startY + 5);
    ctx.stroke();

    // Label
    ctx.fillStyle = '#64748B';
    ctx.font = '12px "Chakra Petch", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('BOTTOM', x + boxW / 2, startY + 20);

    items.forEach((val, i) => {
        const y = startY - (i + 1) * (boxH + 4);
        const isActive = step.activeNode === i;
        const isTop = i === items.length - 1;

        if (isActive || isTop) {
            ctx.shadowColor = isActive ? 'rgba(244, 63, 94, 0.4)' : 'rgba(124, 58, 237, 0.3)';
            ctx.shadowBlur = 15;
        }

        ctx.fillStyle = isActive ? '#F43F5E' : isTop ? '#7C3AED' : '#1E1E3F';
        ctx.strokeStyle = isActive ? '#F43F5E' : isTop ? '#A78BFA' : '#3A3A5C';
        ctx.lineWidth = 2;

        roundRect(ctx, x, y, boxW, boxH, 6);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#E2E8F0';
        ctx.font = 'bold 16px "Chakra Petch", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(val.toString(), x + boxW / 2, y + boxH / 2);

        if (isTop) {
            ctx.fillStyle = '#A78BFA';
            ctx.font = '11px "Chakra Petch", sans-serif';
            ctx.fillText('← TOP', x + boxW + 35, y + boxH / 2);
        }
    });

    // Operation label
    if (step.operation) {
        ctx.fillStyle = '#06B6D4';
        ctx.font = 'bold 14px "Chakra Petch", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(step.operation, w / 2, 20);
    }
}

function drawQueue(ctx: CanvasRenderingContext2D, w: number, h: number, step: AlgorithmStep) {
    const items = step.queueData || [];
    const boxW = 60;
    const boxH = 50;
    const gap = 8;
    const totalW = items.length * (boxW + gap);
    const startX = Math.max(20, (w - totalW) / 2);
    const y = h / 2 - boxH / 2;

    // Draw arrow flow
    if (items.length > 1) {
        ctx.fillStyle = '#3A3A5C';
        ctx.font = '11px "Chakra Petch", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('FRONT (dequeue) ←', startX + 30, y - 20);
        ctx.fillText('→ REAR (enqueue)', startX + totalW - 40, y - 20);
    }

    items.forEach((val, i) => {
        const x = startX + i * (boxW + gap);
        const isActive = step.activeNode === i;
        const isFront = i === 0;
        const isRear = i === items.length - 1;

        if (isActive) {
            ctx.shadowColor = 'rgba(244, 63, 94, 0.4)';
            ctx.shadowBlur = 15;
        } else if (isFront || isRear) {
            ctx.shadowColor = 'rgba(124, 58, 237, 0.3)';
            ctx.shadowBlur = 10;
        }

        ctx.fillStyle = isActive ? '#F43F5E' : isFront ? '#06B6D4' : isRear ? '#7C3AED' : '#1E1E3F';
        ctx.strokeStyle = isActive ? '#F43F5E' : isFront ? '#06B6D4' : isRear ? '#A78BFA' : '#3A3A5C';
        ctx.lineWidth = 2;

        roundRect(ctx, x, y, boxW, boxH, 6);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#E2E8F0';
        ctx.font = 'bold 16px "Chakra Petch", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(val.toString(), x + boxW / 2, y + boxH / 2);

        // Arrow between elements
        if (i < items.length - 1) {
            ctx.fillStyle = '#64748B';
            ctx.font = '16px sans-serif';
            ctx.fillText('→', x + boxW + gap / 2, y + boxH / 2);
        }
    });

    if (step.operation) {
        ctx.fillStyle = '#06B6D4';
        ctx.font = 'bold 14px "Chakra Petch", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(step.operation, w / 2, 20);
    }
}

function drawLinkedList(ctx: CanvasRenderingContext2D, w: number, h: number, step: AlgorithmStep) {
    const nodes = step.linkedList || [];
    const boxW = 70;
    const boxH = 45;
    const gap = 40;
    const totalW = nodes.length * (boxW + gap);
    const startX = Math.max(20, (w - totalW) / 2);
    const y = h / 2 - boxH / 2;

    nodes.forEach((node, i) => {
        const x = startX + i * (boxW + gap);
        const isActive = step.activeNode === i;

        if (node.isNew) {
            ctx.shadowColor = 'rgba(16, 185, 129, 0.4)';
            ctx.shadowBlur = 15;
        } else if (node.isRemoving) {
            ctx.shadowColor = 'rgba(244, 63, 94, 0.4)';
            ctx.shadowBlur = 15;
        } else if (isActive) {
            ctx.shadowColor = 'rgba(124, 58, 237, 0.3)';
            ctx.shadowBlur = 10;
        }

        // Node box
        ctx.fillStyle = node.isRemoving ? '#3F1010' : node.isNew ? '#0A3A2A' : '#1E1E3F';
        ctx.strokeStyle = node.isRemoving ? '#F43F5E' : node.isNew ? '#10B981' : node.isHead ? '#7C3AED' : '#3A3A5C';
        ctx.lineWidth = 2;

        roundRect(ctx, x, y, boxW, boxH, 8);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Value
        ctx.fillStyle = '#E2E8F0';
        ctx.font = 'bold 16px "Chakra Petch", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.value.toString(), x + boxW / 2, y + boxH / 2);

        // Head label
        if (node.isHead) {
            ctx.fillStyle = '#A78BFA';
            ctx.font = '11px "Chakra Petch", sans-serif';
            ctx.fillText('HEAD', x + boxW / 2, y - 12);
        }

        // Arrow to next
        if (i < nodes.length - 1) {
            ctx.strokeStyle = node.isRemoving ? '#F43F5E44' : '#64748B';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x + boxW + 5, y + boxH / 2);
            ctx.lineTo(x + boxW + gap - 5, y + boxH / 2);
            ctx.stroke();

            // Arrowhead
            ctx.beginPath();
            ctx.moveTo(x + boxW + gap - 5, y + boxH / 2);
            ctx.lineTo(x + boxW + gap - 12, y + boxH / 2 - 5);
            ctx.lineTo(x + boxW + gap - 12, y + boxH / 2 + 5);
            ctx.closePath();
            ctx.fillStyle = node.isRemoving ? '#F43F5E44' : '#64748B';
            ctx.fill();
        } else {
            // NULL pointer
            ctx.fillStyle = '#64748B';
            ctx.font = '11px "Chakra Petch", sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText('→ NULL', x + boxW + 8, y + boxH / 2 + 4);
        }
    });

    if (step.operation) {
        ctx.fillStyle = '#06B6D4';
        ctx.font = 'bold 14px "Chakra Petch", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(step.operation, w / 2, 20);
    }
}

function drawTree(ctx: CanvasRenderingContext2D, w: number, h: number, step: AlgorithmStep) {
    const root = step.tree;
    if (!root) {
        ctx.fillStyle = '#64748B';
        ctx.font = '16px "Chakra Petch", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('BST rỗng', w / 2, h / 2);
        if (step.operation) {
            ctx.fillStyle = '#06B6D4';
            ctx.font = 'bold 14px "Chakra Petch", sans-serif';
            ctx.fillText(step.operation, w / 2, 20);
        }
        return;
    }

    // Calculate positions
    interface PosNode {
        value: number;
        x: number;
        y: number;
        highlighted?: boolean;
        isNew?: boolean;
        left?: PosNode;
        right?: PosNode;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function assignPositions(node: any, x: number, y: number, spread: number): PosNode {
        const pn: PosNode = { value: node.value, x, y, highlighted: node.highlighted, isNew: node.isNew };
        if (node.left) pn.left = assignPositions(node.left, x - spread, y + 60, spread * 0.55);
        if (node.right) pn.right = assignPositions(node.right, x + spread, y + 60, spread * 0.55);
        return pn;
    }

    const tree = assignPositions(root, w / 2, 50, Math.min(w / 4, 120));

    // Draw edges first
    function drawEdges(node: PosNode) {
        if (node.left) {
            ctx.strokeStyle = '#3A3A5C';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(node.left.x, node.left.y);
            ctx.stroke();
            drawEdges(node.left);
        }
        if (node.right) {
            ctx.strokeStyle = '#3A3A5C';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(node.right.x, node.right.y);
            ctx.stroke();
            drawEdges(node.right);
        }
    }
    drawEdges(tree);

    // Draw nodes
    function drawNodes(node: PosNode) {
        const radius = 20;

        if (node.isNew) {
            ctx.shadowColor = 'rgba(16, 185, 129, 0.5)';
            ctx.shadowBlur = 20;
        } else if (node.highlighted) {
            ctx.shadowColor = 'rgba(244, 63, 94, 0.5)';
            ctx.shadowBlur = 20;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.highlighted ? '#F43F5E' : node.isNew ? '#10B981' : '#1E1E3F';
        ctx.fill();
        ctx.strokeStyle = node.highlighted ? '#F43F5E' : node.isNew ? '#10B981' : '#7C3AED';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#E2E8F0';
        ctx.font = 'bold 14px "Chakra Petch", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.value.toString(), node.x, node.y);

        if (node.left) drawNodes(node.left);
        if (node.right) drawNodes(node.right);
    }
    drawNodes(tree);

    if (step.operation) {
        ctx.fillStyle = '#06B6D4';
        ctx.font = 'bold 14px "Chakra Petch", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(step.operation, w / 2, h - 15);
    }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}
