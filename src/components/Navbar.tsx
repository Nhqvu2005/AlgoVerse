'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useTheme } from '@/lib/ThemeContext';
import { useProgress } from '@/lib/hooks/useProgress';
import { algorithms } from '@/lib/algorithmRegistry';

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { t, toggleLocale } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const { stats } = useProgress(algorithms.length);

    const isHome = pathname === '/';

    return (
        <nav className="sticky top-0 z-50 glass border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center
                          shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                            <span className="text-white font-heading text-lg">A</span>
                        </div>
                        <span className="font-heading text-xl text-white group-hover:text-glow transition-all">
                            AlgoVerse
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className={`text-sm font-medium transition-colors duration-200 ${isHome ? 'text-primary-light' : 'text-text-secondary hover:text-white'
                                }`}
                        >
                            {t.nav.home}
                        </Link>
                        <Link
                            href="/#algorithms"
                            className="text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200"
                        >
                            {t.nav.algorithms}
                        </Link>

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLocale}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold border border-white/10 bg-surface/50
                         hover:border-primary/40 hover:bg-primary/10 text-text-secondary hover:text-white
                         transition-all duration-200"
                            title="Switch language"
                        >
                            🌐 {t.langToggle}
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold border border-white/10 bg-surface/50
                         hover:border-primary/40 hover:bg-primary/10 text-text-secondary hover:text-white
                         transition-all duration-200"
                            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>

                        {/* Progress Indicator */}
                        <div className="flex items-center gap-2" title={`${stats.completedCount}/${stats.totalAlgorithms} completed`}>
                            <div className="w-16 h-1.5 bg-surface-light rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary to-secondary"
                                    style={{ width: `${stats.percentage}%` }}
                                />
                            </div>
                            <span className="text-xs text-text-muted">{stats.percentage}%</span>
                        </div>

                        <a
                            href="https://github.com/Nhqvu2005"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-icon"
                            title="GitHub"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    </div>

                    {/* Mobile: lang toggle + menu button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleLocale}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold border border-white/10 bg-surface/50
                         text-text-secondary transition-all duration-200"
                        >
                            🌐 {t.langToggle}
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold border border-white/10 bg-surface/50
                         text-text-secondary transition-all duration-200"
                        >
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>
                        <button
                            className="btn-icon"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                {mobileOpen && (
                    <div className="md:hidden pb-4 animate-slide-up">
                        <div className="flex flex-col gap-2">
                            <Link
                                href="/"
                                className="px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-white hover:bg-surface-light transition-all"
                                onClick={() => setMobileOpen(false)}
                            >
                                {t.nav.home}
                            </Link>
                            <Link
                                href="/#algorithms"
                                className="px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-white hover:bg-surface-light transition-all"
                                onClick={() => setMobileOpen(false)}
                            >
                                {t.nav.algorithms}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
