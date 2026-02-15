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
import { AlgorithmStep, categoryConfig } from '@/lib/types';
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
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const initSteps = useCallback(() => {
        if (!algo) return;
        let input: number[] | undefined;
        if (customInput.trim()) {
            input = customInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
        }
        const newSteps = algo.generateSteps(input || algo.defaultInput);
        setSteps(newSteps);
        setCurrentStep(0);
        setIsPlaying(false);
    }, [algo, customInput]);

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

                        {/* Custom Input */}
                        {(algo.category === 'sorting' || algo.category === 'searching') && (
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
                        <CodeDisplay code={algo.code} activeLine={step.codeLine} />

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
