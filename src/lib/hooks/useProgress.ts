'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

interface ProgressData {
    completedAlgorithms: string[];
    quizScores: Record<string, number>;
    bookmarks: string[];
    lastVisited: string | null;
    totalVisits: number;
}

interface ProgressStats {
    completedCount: number;
    totalAlgorithms: number;
    percentage: number;
    quizAverage: number;
    streak: number;
    bookmarksCount: number;
}

const STORAGE_KEYS = {
    PROGRESS: 'algoverse_progress',
    LAST_VISIT: 'algoverse_last_visit',
    STREAK: 'algoverse_streak',
};

const DEFAULT_PROGRESS: ProgressData = {
    completedAlgorithms: [],
    quizScores: {},
    bookmarks: [],
    lastVisited: null,
    totalVisits: 0,
};

export function useProgress(totalAlgorithms: number = 21) {
    const [progress, setProgress] = useState<ProgressData>(DEFAULT_PROGRESS);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load progress from localStorage
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const saved = localStorage.getItem(STORAGE_KEYS.PROGRESS);
        if (saved) {
            try {
                setProgress(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse progress:', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save progress to localStorage
    const saveProgress = useCallback((data: ProgressData) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(data));
        setProgress(data);
    }, []);

    // Mark algorithm as completed (viewed all steps)
    const markCompleted = useCallback((slug: string) => {
        const newProgress = {
            ...progress,
            completedAlgorithms: progress.completedAlgorithms.includes(slug)
                ? progress.completedAlgorithms
                : [...progress.completedAlgorithms, slug],
            lastVisited: slug,
            totalVisits: progress.totalVisits + 1,
        };
        saveProgress(newProgress);
    }, [progress, saveProgress]);

    // Save quiz score
    const saveQuizScore = useCallback((slug: string, score: number) => {
        const newProgress = {
            ...progress,
            quizScores: {
                ...progress.quizScores,
                [slug]: score,
            },
        };
        saveProgress(newProgress);
    }, [progress, saveProgress]);

    // Toggle bookmark
    const toggleBookmark = useCallback((slug: string) => {
        const isBookmarked = progress.bookmarks.includes(slug);
        const newProgress = {
            ...progress,
            bookmarks: isBookmarked
                ? progress.bookmarks.filter(b => b !== slug)
                : [...progress.bookmarks, slug],
        };
        saveProgress(newProgress);
    }, [progress, saveProgress]);

    // Check if algorithm is completed
    const isCompleted = useCallback((slug: string) => {
        return progress.completedAlgorithms.includes(slug);
    }, [progress.completedAlgorithms]);

    // Check if algorithm is bookmarked
    const isBookmarked = useCallback((slug: string) => {
        return progress.bookmarks.includes(slug);
    }, [progress.bookmarks]);

    // Get quiz score for algorithm
    const getQuizScore = useCallback((slug: string) => {
        return progress.quizScores[slug] || null;
    }, [progress.quizScores]);

    // Calculate stats
    const stats = useMemo((): ProgressStats => {
        const completedCount = progress.completedAlgorithms.length;
        const quizScores = Object.values(progress.quizScores);
        const quizAverage = quizScores.length > 0
            ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length
            : 0;

        return {
            completedCount,
            totalAlgorithms,
            percentage: totalAlgorithms > 0 ? Math.round((completedCount / totalAlgorithms) * 100) : 0,
            quizAverage: Math.round(quizAverage * 10) / 10,
            streak: 0,
            bookmarksCount: progress.bookmarks.length,
        };
    }, [progress, totalAlgorithms]);

    // Reset all progress
    const resetProgress = useCallback(() => {
        saveProgress(DEFAULT_PROGRESS);
    }, [saveProgress]);

    return {
        progress,
        stats,
        isLoaded,
        markCompleted,
        saveQuizScore,
        toggleBookmark,
        isCompleted,
        isBookmarked,
        getQuizScore,
        resetProgress,
    };
}
