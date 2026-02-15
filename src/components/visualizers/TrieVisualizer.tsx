'use client';

import { AlgorithmStep } from '@/lib/types';
import { useEffect, useRef } from 'react';

interface TrieVisualizerProps {
    step: AlgorithmStep;
}

interface VisualNode {
    char: string;
    isEndOfWord: boolean;
    x: number;
    y: number;
    children: VisualNode[];
    isNew?: boolean;
    highlighted?: boolean;
    width?: number; // subtree width
}

export default function TrieVisualizer({ step }: TrieVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !step.trie) return;

        const ctx = canvas.getContext('2d')!;
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const w = rect.width;
        const h = rect.height;
        ctx.clearRect(0, 0, w, h);

        // Layout calc
        const nodeRadius = 18;
        const levelHeight = 60;
        const siblingGap = 10;

        // Recursive function to calculate subtree widths and positions
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function buildVisualTree(node: any): VisualNode {
            const vNode: VisualNode = {
                char: node.char,
                isEndOfWord: node.isEndOfWord,
                x: 0,
                y: 0,
                children: [],
                isNew: node.isNew,
                highlighted: node.highlighted
            };

            const keys = Object.keys(node.children || {}).sort();
            let totalWidth = 0;

            keys.forEach(key => {
                const child = buildVisualTree(node.children[key]);
                vNode.children.push(child);
                totalWidth += (child.width || 0) + siblingGap;
            });

            if (vNode.children.length === 0) {
                totalWidth = nodeRadius * 2;
            } else {
                totalWidth -= siblingGap; // Remove last gap
            }

            vNode.width = totalWidth;
            return vNode;
        }

        // Assign coordinates
        function assignCoords(node: VisualNode, x: number, y: number) {
            node.x = x;
            node.y = y;

            let currentX = x - (node.width! / 2);

            node.children.forEach(child => {
                const childX = currentX + (child.width! / 2);
                assignCoords(child, childX, y + levelHeight);
                currentX += child.width! + siblingGap;
            });
        }

        const root = buildVisualTree(step.trie);
        assignCoords(root, w / 2, 40);

        // Draw connections
        function drawEdges(node: VisualNode) {
            node.children.forEach(child => {
                ctx.strokeStyle = '#3A3A5C';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(node.x, node.y + nodeRadius);
                ctx.lineTo(child.x, child.y - nodeRadius);
                ctx.stroke();
                drawEdges(child);
            });
        }
        drawEdges(root);

        // Draw nodes
        function drawNodes(node: VisualNode) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);

            if (node.isEndOfWord) {
                ctx.fillStyle = '#7C3AED'; // Purple for word end
            } else {
                ctx.fillStyle = '#1E1E3F';
            }

            if (node.highlighted) {
                ctx.strokeStyle = '#F43F5E';
                ctx.lineWidth = 3;
            } else if (node.isNew) {
                ctx.strokeStyle = '#10B981';
                ctx.lineWidth = 3;
            } else {
                ctx.strokeStyle = '#4A4A7A';
                ctx.lineWidth = 2;
            }

            ctx.fill();
            ctx.stroke();

            // Char
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 14px "Chakra Petch", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.char || '*', node.x, node.y);

            node.children.forEach(drawNodes);
        }
        drawNodes(root);

    }, [step]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ minHeight: '400px' }}
        />
    );
}
