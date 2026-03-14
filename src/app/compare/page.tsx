'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ArrayVisualizer from '@/components/visualizers/ArrayVisualizer';
import GraphVisualizer from '@/components/visualizers/GraphVisualizer';
import { algorithms } from '@/lib/algorithmRegistry';
import { categoryConfig, AlgorithmStep } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';

interface ComparisonState {
    algo1: typeof algorithms[0] | null;
    algo2: typeof algorithms[0] | null;
    steps1: AlgorithmStep[];
    steps2: AlgorithmStep[];
    currentStep1: number;
    currentStep2: number;
    input1: number[];
    input2: number[];
    isPlaying: boolean;
    speed: number;
}

export default function ComparePage() {
    const { locale } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState('sorting');
    const [selectedAlgo1, setSelectedAlgo1] = useState('');
    const [selectedAlgo2, setSelectedAlgo2] = useState('');

    const [state, setState] = useState<ComparisonState>({
        algo1: null,
        algo2: null,
        steps1: [],
        steps2: [],
        currentStep1: 0,
        currentStep2: 0,
        input1: [],
        input2: [],
        isPlaying: false,
        speed: 1,
    });

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const defaultInput = [64, 34, 25, 12, 22, 11, 90];

    // Filter algorithms by category
    const filteredAlgos = algorithms.filter(a => a.category === selectedCategory);

    // Generate steps for selected algorithm
    const generateSteps = useCallback((algoSlug: string, input: number[]) => {
        const algo = algorithms.find(a => a.slug === algoSlug);
        if (!algo || !algo.generateSteps) return [];

        try {
            return algo.generateSteps([...input]);
        } catch (e) {
            console.error('Error generating steps:', e);
            return [];
        }
    }, []);

    // Handle algorithm selection
    const handleAlgo1Change = (slug: string) => {
        setSelectedAlgo1(slug);
        const algo = algorithms.find(a => a.slug === slug);
        if (algo) {
            const steps = generateSteps(slug, defaultInput);
            setState(prev => ({
                ...prev,
                algo1: algo,
                steps1: steps,
                currentStep1: 0,
                input1: defaultInput,
            }));
        }
    };

    const handleAlgo2Change = (slug: string) => {
        setSelectedAlgo2(slug);
        const algo = algorithms.find(a => a.slug === slug);
        if (algo) {
            const steps = generateSteps(slug, defaultInput);
            setState(prev => ({
                ...prev,
                algo2: algo,
                steps2: steps,
                currentStep2: 0,
                input2: defaultInput,
            }));
        }
    };

    // Play both visualizations
    useEffect(() => {
        if (state.isPlaying && (state.steps1.length > 0 || state.steps2.length > 0)) {
            intervalRef.current = setInterval(() => {
                setState(prev => {
                    let newStep1 = prev.currentStep1;
                    let newStep2 = prev.currentStep2;
                    let stillPlaying = prev.isPlaying;

                    if (prev.currentStep1 < prev.steps1.length - 1) {
                        newStep1 = prev.currentStep1 + 1;
                    }
                    if (prev.currentStep2 < prev.steps2.length - 1) {
                        newStep2 = prev.currentStep2 + 1;
                    }

                    if (newStep1 === prev.currentStep1 && newStep2 === prev.currentStep2) {
                        stillPlaying = false;
                    }

                    return {
                        ...prev,
                        currentStep1: newStep1,
                        currentStep2: newStep2,
                        isPlaying: stillPlaying,
                    };
                });
            }, 800 / state.speed);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [state.isPlaying, state.speed, state.steps1.length, state.steps2.length]);

    const handlePlay = () => {
        setState(prev => ({ ...prev, isPlaying: true }));
    };

    const handlePause = () => {
        setState(prev => ({ ...prev, isPlaying: false }));
    };

    const handleReset = () => {
        setState(prev => ({
            ...prev,
            currentStep1: 0,
            currentStep2: 0,
            isPlaying: false,
        }));
    };

    const handleSpeedChange = (newSpeed: number) => {
        setState(prev => ({ ...prev, speed: newSpeed }));
    };

    const renderVisualizer = (stepIndex: number, steps: AlgorithmStep[], input: number[], algo: typeof algorithms[0] | null) => {
        if (!algo || steps.length === 0) return null;

        const currentStep = steps[stepIndex];
        if (!currentStep) return null;

        const arrayType = algo.category === 'sorting' || algo.category === 'searching';
        const graphType = algo.category === 'graph';

        if (arrayType) {
            return <ArrayVisualizer step={currentStep} />;
        }

        if (graphType && currentStep.graph) {
            return (
                <GraphVisualizer
                    data={currentStep.graph}
                    highlightNodes={currentStep.highlight || []}
                    highlightEdges={currentStep.highlightEdges || []}
                />
            );
        }

        // For other types, create a step object with the input
        const defaultStep: AlgorithmStep = {
            array: input,
            highlight: [],
            sorted: [],
            description: '',
        };

        return <ArrayVisualizer step={defaultStep} />;
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-darker">
                {/* Header */}
                <div className="bg-surface border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="font-heading text-2xl md:text-3xl text-white">
                                    {locale === 'vi' ? 'So sánh Thuật toán' : 'Algorithm Comparison'}
                                </h1>
                                <p className="text-text-secondary text-sm mt-1">
                                    {locale === 'vi'
                                        ? 'Chạy 2 thuật toán song song để so sánh'
                                        : 'Run 2 algorithms in parallel to compare'}
                                </p>
                            </div>
                            <Link
                                href="/"
                                className="btn-secondary text-sm"
                            >
                                ← {locale === 'vi' ? 'Quay lại' : 'Back'}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {/* Category & Algorithm Selectors */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {/* Category */}
                        <div>
                            <label className="block text-sm text-text-secondary mb-2">
                                {locale === 'vi' ? 'Danh mục' : 'Category'}
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    setSelectedAlgo1('');
                                    setSelectedAlgo2('');
                                    setState(prev => ({
                                        ...prev,
                                        algo1: null,
                                        algo2: null,
                                        steps1: [],
                                        steps2: [],
                                        currentStep1: 0,
                                        currentStep2: 0,
                                    }));
                                }}
                                className="input-field"
                            >
                                {Object.entries(categoryConfig).map(([key, conf]) => (
                                    <option key={key} value={key}>
                                        {conf.icon} {locale === 'vi' ? conf.label : conf.labelEn}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Algorithm 1 */}
                        <div>
                            <label className="block text-sm text-text-secondary mb-2">
                                {locale === 'vi' ? 'Thuật toán 1' : 'Algorithm 1'}
                            </label>
                            <select
                                value={selectedAlgo1}
                                onChange={(e) => handleAlgo1Change(e.target.value)}
                                className="input-field"
                            >
                                <option value="">
                                    {locale === 'vi' ? 'Chọn thuật toán...' : 'Select algorithm...'}
                                </option>
                                {filteredAlgos.map(algo => (
                                    <option key={algo.slug} value={algo.slug}>
                                        {algo.icon} {locale === 'vi' ? algo.nameVi : algo.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Algorithm 2 */}
                        <div>
                            <label className="block text-sm text-text-secondary mb-2">
                                {locale === 'vi' ? 'Thuật toán 2' : 'Algorithm 2'}
                            </label>
                            <select
                                value={selectedAlgo2}
                                onChange={(e) => handleAlgo2Change(e.target.value)}
                                className="input-field"
                            >
                                <option value="">
                                    {locale === 'vi' ? 'Chọn thuật toán...' : 'Select algorithm...'}
                                </option>
                                {filteredAlgos.map(algo => (
                                    <option key={algo.slug} value={algo.slug}>
                                        {algo.icon} {locale === 'vi' ? algo.nameVi : algo.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Playback Controls */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <button
                            onClick={handleReset}
                            className="btn-icon"
                            title={locale === 'vi' ? 'Đặt lại' : 'Reset'}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>

                        <button
                            onClick={state.isPlaying ? handlePause : handlePlay}
                            disabled={!state.algo1 && !state.algo2}
                            className="btn-primary flex items-center gap-2"
                        >
                            {state.isPlaying ? (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {locale === 'vi' ? 'Tạm dừng' : 'Pause'}
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {locale === 'vi' ? 'Chạy' : 'Play'}
                                </>
                            )}
                        </button>

                        {/* Speed */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-text-muted">Speed:</span>
                            {[0.5, 1, 2, 4].map(s => (
                                <button
                                    key={s}
                                    onClick={() => handleSpeedChange(s)}
                                    className={`px-2 py-1 rounded text-xs ${
                                        state.speed === s
                                            ? 'bg-primary/20 text-primary-light'
                                            : 'bg-surface text-text-secondary hover:text-white'
                                    }`}
                                >
                                    {s}x
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Comparison Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Algorithm 1 */}
                        <div className="glass rounded-xl p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-heading text-lg text-white">
                                    {state.algo1
                                        ? (locale === 'vi' ? state.algo1.nameVi : state.algo1.name)
                                        : (locale === 'vi' ? 'Chọn thuật toán' : 'Select algorithm')}
                                </h3>
                                {state.algo1 && (
                                    <span className="text-xs text-text-muted font-mono">
                                        {state.algo1.timeComplexity.average}
                                    </span>
                                )}
                            </div>
                            <div className="min-h-[250px]">
                                {renderVisualizer(state.currentStep1, state.steps1, state.input1, state.algo1)}
                            </div>
                            {state.steps1.length > 0 && (
                                <div className="mt-4">
                                    <div className="flex items-center justify-between text-xs text-text-muted mb-2">
                                        <span>Step {state.currentStep1 + 1}/{state.steps1.length}</span>
                                        <span>{Math.round((state.currentStep1 / Math.max(state.steps1.length - 1, 1)) * 100)}%</span>
                                    </div>
                                    <div className="h-1.5 bg-surface-light rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all"
                                            style={{ width: `${(state.currentStep1 / Math.max(state.steps1.length - 1, 1)) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Algorithm 2 */}
                        <div className="glass rounded-xl p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-heading text-lg text-white">
                                    {state.algo2
                                        ? (locale === 'vi' ? state.algo2.nameVi : state.algo2.name)
                                        : (locale === 'vi' ? 'Chọn thuật toán' : 'Select algorithm')}
                                </h3>
                                {state.algo2 && (
                                    <span className="text-xs text-text-muted font-mono">
                                        {state.algo2.timeComplexity.average}
                                    </span>
                                )}
                            </div>
                            <div className="min-h-[250px]">
                                {renderVisualizer(state.currentStep2, state.steps2, state.input2, state.algo2)}
                            </div>
                            {state.steps2.length > 0 && (
                                <div className="mt-4">
                                    <div className="flex items-center justify-between text-xs text-text-muted mb-2">
                                        <span>Step {state.currentStep2 + 1}/{state.steps2.length}</span>
                                        <span>{Math.round((state.currentStep2 / Math.max(state.steps2.length - 1, 1)) * 100)}%</span>
                                    </div>
                                    <div className="h-1.5 bg-surface-light rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-secondary transition-all"
                                            style={{ width: `${(state.currentStep2 / Math.max(state.steps2.length - 1, 1)) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Comparison Summary */}
                    {state.algo1 && state.algo2 && (
                        <div className="mt-8 glass rounded-xl p-6">
                            <h3 className="font-heading text-lg text-white mb-4">
                                {locale === 'vi' ? 'So sánh độ phức tạp' : 'Complexity Comparison'}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-surface/50 rounded-lg">
                                    <div className="text-xs text-text-muted mb-1">
                                        {locale === 'vi' ? 'Time (Average)' : 'Time (Average)'}
                                    </div>
                                    <div className="font-mono text-sm text-white">{state.algo1.timeComplexity.average}</div>
                                    <div className="font-mono text-sm text-secondary">{state.algo2.timeComplexity.average}</div>
                                </div>
                                <div className="text-center p-4 bg-surface/50 rounded-lg">
                                    <div className="text-xs text-text-muted mb-1">
                                        {locale === 'vi' ? 'Time (Worst)' : 'Time (Worst)'}
                                    </div>
                                    <div className="font-mono text-sm text-white">{state.algo1.timeComplexity.worst}</div>
                                    <div className="font-mono text-sm text-secondary">{state.algo2.timeComplexity.worst}</div>
                                </div>
                                <div className="text-center p-4 bg-surface/50 rounded-lg">
                                    <div className="text-xs text-text-muted mb-1">
                                        {locale === 'vi' ? 'Space' : 'Space'}
                                    </div>
                                    <div className="font-mono text-sm text-white">{state.algo1.spaceComplexity}</div>
                                    <div className="font-mono text-sm text-secondary">{state.algo2.spaceComplexity}</div>
                                </div>
                                <div className="text-center p-4 bg-surface/50 rounded-lg">
                                    <div className="text-xs text-text-muted mb-1">
                                        {locale === 'vi' ? 'Số bước' : 'Steps'}
                                    </div>
                                    <div className="font-mono text-sm text-white">{state.steps1.length}</div>
                                    <div className="font-mono text-sm text-secondary">{state.steps2.length}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
