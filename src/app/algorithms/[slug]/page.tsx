'use client';

import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ControlPanel from '@/components/ControlPanel';
import CodeDisplay from '@/components/CodeDisplay';
import ArrayVisualizer from '@/components/visualizers/ArrayVisualizer';
import GraphVisualizer from '@/components/visualizers/GraphVisualizer';
import DataStructureVisualizer from '@/components/visualizers/DataStructureVisualizer';
import { getAlgorithmBySlug } from '@/lib/algorithmRegistry';
import { AlgorithmStep, GraphData, categoryConfig } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';

export default function AlgorithmPage() {
    const params = useParams();
    const slug = params.slug as string;
    const algo = getAlgorithmBySlug(slug);
    const { t, locale } = useLanguage();

    const [steps, setSteps] = useState<AlgorithmStep[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [customInput, setCustomInput] = useState('');
    const [customTarget, setCustomTarget] = useState('');
    const [graphNodes, setGraphNodes] = useState('');
    const [graphEdges, setGraphEdges] = useState('');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const initSteps = useCallback(() => {
        if (!algo) return;
        const inputType = algo.inputType || 'array';

        if (inputType === 'array-target') {
            // Search algorithms: parse array + target
            let input: number[] | undefined;
            if (customInput.trim()) {
                input = customInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
            }
            const target = customTarget.trim() ? parseInt(customTarget.trim()) : undefined;
            const newSteps = algo.generateSteps({
                array: input || algo.defaultInput,
                target: !isNaN(target as number) ? target : algo.defaultTarget,
            });
            setSteps(newSteps);
        } else if (inputType === 'graph') {
            // Graph algorithms: parse nodes + edges
            if (graphNodes.trim() || graphEdges.trim()) {
                const nodeCount = parseInt(graphNodes.trim()) || 7;
                const edgePairs = graphEdges.trim().split(',').map(e => {
                    const parts = e.trim().split('-').map(p => parseInt(p.trim()));
                    return parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])
                        ? { from: parts[0], to: parts[1] }
                        : null;
                }).filter(Boolean) as { from: number; to: number }[];

                if (edgePairs.length > 0) {
                    // Auto-layout nodes in a circle
                    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
                        id: i,
                        label: String(i),
                        x: 200 + 150 * Math.cos((2 * Math.PI * i) / nodeCount - Math.PI / 2),
                        y: 170 + 130 * Math.sin((2 * Math.PI * i) / nodeCount - Math.PI / 2),
                    }));
                    const graphData: GraphData = { nodes, edges: edgePairs };
                    setSteps(algo.generateSteps(graphData));
                } else {
                    setSteps(algo.generateSteps());
                }
            } else {
                setSteps(algo.generateSteps());
            }
        } else if (inputType === 'array') {
            let input: number[] | undefined;
            if (customInput.trim()) {
                input = customInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
            }
            setSteps(algo.generateSteps(input || algo.defaultInput));
        } else {
            // none (data structures)
            setSteps(algo.generateSteps());
        }

        setCurrentStep(0);
        setIsPlaying(false);
    }, [algo, customInput, customTarget, graphNodes, graphEdges]);

    useEffect(() => {
        initSteps();
    }, [initSteps]);

    useEffect(() => {
        if (isPlaying && steps.length > 0) {
            intervalRef.current = setInterval(() => {
                setCurrentStep(prev => {
                    if (prev >= steps.length - 1) {
                        setIsPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 800 / speed);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPlaying, speed, steps.length]);

    if (!algo) {
        return (
            <>
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <span className="text-6xl block mb-4">😵</span>
                        <h1 className="font-heading text-2xl text-white mb-2">{t.detail.notFound}</h1>
                        <Link href="/" className="btn-secondary mt-4 inline-block">{t.detail.backHome}</Link>
                    </div>
                </div>
            </>
        );
    }

    const step = steps[currentStep] || { description: '' };
    const catConf = categoryConfig[algo.category];
    const inputType = algo.inputType || (algo.category === 'sorting' ? 'array' : algo.category === 'searching' ? 'array-target' : algo.category === 'graph' ? 'graph' : 'none');

    const renderVisualizer = () => {
        if (algo.category === 'sorting' || algo.category === 'searching') {
            return <ArrayVisualizer step={step} />;
        } else if (algo.category === 'graph') {
            return <GraphVisualizer step={step} />;
        } else if (algo.category === 'data-structure') {
            const dsType = algo.slug === 'stack' ? 'stack'
                : algo.slug === 'queue' ? 'queue'
                    : algo.slug === 'linked-list' ? 'linkedList'
                        : 'tree';
            return <DataStructureVisualizer step={step} type={dsType} />;
        }
        return null;
    };

    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/" className="text-text-muted hover:text-white text-sm mb-4 inline-flex items-center gap-1 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t.detail.backToAll}
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center gap-4 mt-2">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">{algo.icon}</span>
                            <div>
                                <h1 className="font-heading text-2xl md:text-3xl text-white">{algo.name}</h1>
                                <p className="text-text-muted text-sm">{algo.nameVi}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 md:ml-auto">
                            <span className={`badge-${catConf.color}`}>
                                {catConf.icon} {t.categories[algo.category] || catConf.label}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Layout: Visualization + Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main visualization area */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Visualizer */}
                        <div className="glass rounded-xl p-4" style={{ minHeight: '340px' }}>
                            <div className="w-full h-full" style={{ minHeight: '300px' }}>
                                {renderVisualizer()}
                            </div>
                        </div>

                        {/* Controls */}
                        <ControlPanel
                            isPlaying={isPlaying}
                            currentStep={currentStep}
                            totalSteps={steps.length}
                            speed={speed}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onStepForward={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}
                            onStepBackward={() => setCurrentStep(prev => Math.max(prev - 1, 0))}
                            onReset={initSteps}
                            onSpeedChange={setSpeed}
                        />

                        {/* Custom Input — Array */}
                        {(inputType === 'array' || inputType === 'array-target') && (
                            <div className="glass rounded-xl p-4">
                                <label className="text-sm text-text-secondary mb-2 block">
                                    {t.detail.customInputLabel}
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder={algo.defaultInput?.join(', ')}
                                        value={customInput}
                                        onChange={(e) => setCustomInput(e.target.value)}
                                        className="input-field flex-1"
                                    />
                                    {inputType !== 'array-target' && (
                                        <button onClick={initSteps} className="btn-primary whitespace-nowrap">
                                            {t.detail.apply}
                                        </button>
                                    )}
                                </div>

                                {/* Target input for searching */}
                                {inputType === 'array-target' && (
                                    <>
                                        <label className="text-sm text-text-secondary mb-2 block mt-3">
                                            {t.detail.targetLabel}
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                placeholder={String(algo.defaultTarget ?? '')}
                                                value={customTarget}
                                                onChange={(e) => setCustomTarget(e.target.value)}
                                                className="input-field flex-1"
                                            />
                                            <button onClick={initSteps} className="btn-primary whitespace-nowrap">
                                                {t.detail.apply}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Custom Input — Graph */}
                        {inputType === 'graph' && (
                            <div className="glass rounded-xl p-4">
                                <label className="text-sm text-text-secondary mb-2 block">
                                    {t.detail.graphNodesLabel}
                                </label>
                                <input
                                    type="number"
                                    placeholder="7"
                                    value={graphNodes}
                                    onChange={(e) => setGraphNodes(e.target.value)}
                                    className="input-field w-full mb-3"
                                />
                                <label className="text-sm text-text-secondary mb-2 block">
                                    {t.detail.graphEdgesLabel}
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="0-1, 0-2, 1-3, 1-4, 2-5, 2-6"
                                        value={graphEdges}
                                        onChange={(e) => setGraphEdges(e.target.value)}
                                        className="input-field flex-1"
                                    />
                                    <button onClick={initSteps} className="btn-primary whitespace-nowrap">
                                        {t.detail.apply}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step Description */}
                        <div className="glass rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-primary text-sm font-bold">{currentStep + 1}</span>
                                </div>
                                <div>
                                    <p className="text-text-primary leading-relaxed">
                                        {locale === 'vi' ? step.description : (step.descriptionEn || step.description)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Code Display */}
                        <CodeDisplay
                            code={algo.code}
                            codeLanguages={algo.codeLanguages}
                            activeLine={step.codeLine}
                            activeLines={step.codeLines}
                        />

                        {/* Complexity Info */}
                        <div className="glass rounded-xl p-4">
                            <h3 className="font-heading text-sm text-white mb-3">{t.detail.complexity}</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-text-muted">{t.detail.timeBest}</span>
                                    <span className="font-mono text-success">{algo.timeComplexity.best}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-muted">{t.detail.timeAvg}</span>
                                    <span className="font-mono text-warning">{algo.timeComplexity.average}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-muted">{t.detail.timeWorst}</span>
                                    <span className="font-mono text-danger">{algo.timeComplexity.worst}</span>
                                </div>
                                <div className="divider my-2" />
                                <div className="flex justify-between">
                                    <span className="text-text-muted">{t.detail.space}</span>
                                    <span className="font-mono text-accent">{algo.spaceComplexity}</span>
                                </div>
                            </div>
                        </div>

                        {/* Usage Guide */}
                        {algo.guide && (
                            <div className="glass rounded-xl p-4">
                                <h3 className="font-heading text-sm text-white mb-3">{t.detail.guideTitle}</h3>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <span className="text-primary font-semibold text-xs uppercase tracking-wider">{t.detail.guideInput}</span>
                                        <p className="text-text-secondary mt-1 leading-relaxed">
                                            {locale === 'vi' ? algo.guide.input : algo.guide.inputEn}
                                        </p>
                                    </div>
                                    <div className="divider" />
                                    <div>
                                        <span className="text-warning font-semibold text-xs uppercase tracking-wider">{t.detail.guideConditions}</span>
                                        <p className="text-text-secondary mt-1 leading-relaxed">
                                            {locale === 'vi' ? algo.guide.conditions : algo.guide.conditionsEn}
                                        </p>
                                    </div>
                                    <div className="divider" />
                                    <div>
                                        <span className="text-success font-semibold text-xs uppercase tracking-wider">{t.detail.guideOutput}</span>
                                        <p className="text-text-secondary mt-1 leading-relaxed">
                                            {locale === 'vi' ? algo.guide.output : algo.guide.outputEn}
                                        </p>
                                    </div>
                                    <div className="divider" />
                                    <div>
                                        <span className="text-accent font-semibold text-xs uppercase tracking-wider">{t.detail.guideExplanation}</span>
                                        <p className="text-text-secondary mt-1 leading-relaxed">
                                            {locale === 'vi' ? algo.guide.explanation : algo.guide.explanationEn}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        <div className="glass rounded-xl p-4">
                            <h3 className="font-heading text-sm text-white mb-2">{t.detail.description}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {locale === 'vi' ? algo.description : (algo.descriptionEn || algo.description)}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
