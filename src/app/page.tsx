'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { algorithms } from '@/lib/algorithmRegistry';
import { categoryConfig, difficultyConfig } from '@/lib/types';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

const categories = ['all', 'sorting', 'searching', 'graph', 'data-structure', 'concept'] as const;
const difficulties = ['all', 'beginner', 'intermediate', 'advanced'] as const;

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('all');
  const { t, locale } = useLanguage();

  const filtered = algorithms.filter(algo => {
    const matchSearch = algo.name.toLowerCase().includes(search.toLowerCase()) ||
      algo.nameVi.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'all' || algo.category === activeCategory;
    const matchDifficulty = activeDifficulty === 'all' || algo.difficulty === activeDifficulty;
    return matchSearch && matchCategory && matchDifficulty;
  });

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-float inline-block mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-lg">
              <span className="text-4xl">🧮</span>
            </div>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white mb-4">
            Algo<span className="gradient-text">Verse</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            {t.hero.subtitle1}
            <br />
            {t.hero.subtitle2}{' '}
            <span className="text-primary-light font-semibold">{t.hero.subtitle2Highlight}</span>{' '}
            {t.hero.subtitle2End}
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <a href="#algorithms" className="btn-primary text-base">
              {t.hero.cta}
              <svg className="inline ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-sm text-text-muted mt-8">
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-lg">{algorithms.length}</span>
              <span>{t.hero.statAlgorithms}</span>
            </div>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-secondary font-bold text-lg">4</span>
              <span>{t.hero.statCategories}</span>
            </div>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-accent font-bold text-lg">100%</span>
              <span>{t.hero.statInteractive}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Algorithm Catalog */}
      <section id="algorithms" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">{t.catalog.title}</h2>
            <p className="text-text-secondary">{t.catalog.subtitle}</p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder={t.catalog.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {categories.map(cat => {
              const catKey = cat as string;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === cat
                    ? 'bg-primary/20 text-primary-light border border-primary/40 shadow-glow-sm'
                    : 'bg-surface/50 text-text-secondary border border-white/5 hover:border-primary/20 hover:text-white'
                    }`}
                >
                  {cat === 'all'
                    ? `🌐 ${t.catalog.allCategories}`
                    : `${categoryConfig[cat as keyof typeof categoryConfig].icon} ${t.categories[catKey] || categoryConfig[cat as keyof typeof categoryConfig].label}`
                  }
                </button>
              );
            })}
          </div>

          {/* Difficulty Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {difficulties.map(diff => {
              const diffConf = difficultyConfig[diff as keyof typeof difficultyConfig];
              return (
                <button
                  key={diff}
                  onClick={() => setActiveDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${activeDifficulty === diff
                    ? diff === 'beginner' ? 'bg-success/20 text-success border border-success/40'
                      : diff === 'intermediate' ? 'bg-warning/20 text-warning border border-warning/40'
                      : 'bg-danger/20 text-danger border border-danger/40'
                    : 'bg-surface/50 text-text-secondary border border-white/5 hover:border-white/20 hover:text-white'
                    }`}
                >
                  {diff === 'all' ? '🎯 Tất cả cấp độ' : `${diffConf.icon} ${locale === 'vi' ? diffConf.label : diffConf.labelEn}`}
                </button>
              );
            })}
          </div>

          {/* Algorithm Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((algo, index) => {
              const catConf = categoryConfig[algo.category];
              const badgeClass = `badge-${catConf.color}`;

              return (
                <Link
                  key={algo.slug}
                  href={`/algorithms/${algo.slug}`}
                  className="card-interactive group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{algo.icon}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-base text-white group-hover:text-primary-light transition-colors truncate">
                        {locale === 'vi' ? algo.nameVi : algo.name}
                      </h3>
                      <p className="text-xs text-text-muted">{locale === 'vi' ? algo.name : algo.nameVi}</p>
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary line-clamp-2 mb-3">
                    {locale === 'vi' ? algo.description : algo.descriptionEn || algo.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={badgeClass}>
                        {catConf.icon} {t.categories[algo.category] || catConf.label}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        algo.difficulty === 'beginner' ? 'bg-success/20 text-success' :
                        algo.difficulty === 'intermediate' ? 'bg-warning/20 text-warning' :
                        'bg-danger/20 text-danger'
                      }`}>
                        {difficultyConfig[algo.difficulty].icon} {locale === 'vi' ? difficultyConfig[algo.difficulty].label : difficultyConfig[algo.difficulty].labelEn}
                      </span>
                    </div>
                    <span className="text-xs text-text-muted font-mono">{algo.timeComplexity.average}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <span className="text-4xl mb-4 block">🔍</span>
              <p className="text-text-secondary">{t.catalog.noResults}</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-text-muted text-sm">
            © 2026 <span className="text-primary-light">AlgoVerse</span> — {t.footer.text}
          </p>
        </div>
      </footer>
    </>
  );
}
