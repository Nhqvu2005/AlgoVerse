'use client';

import { useState, useCallback } from 'react';
import { CodeLanguages, CodeLanguage } from '@/lib/types';
import { useLanguage } from '@/lib/LanguageContext';

interface CodeDisplayProps {
    code: string;
    codeLanguages?: CodeLanguages;
    activeLine?: number;
    activeLines?: { [key in CodeLanguage]?: number };
}

const langLabels: Record<CodeLanguage, string> = {
    js: 'JS',
    python: 'Python',
    c: 'C',
    cpp: 'C++',
};

const langFileNames: Record<CodeLanguage, string> = {
    js: 'algorithm.js',
    python: 'algorithm.py',
    c: 'algorithm.c',
    cpp: 'algorithm.cpp',
};

export default function CodeDisplay({ code, codeLanguages, activeLine, activeLines }: CodeDisplayProps) {
    const [lang, setLang] = useState<CodeLanguage>('js');
    const [copied, setCopied] = useState(false);
    const { t } = useLanguage();

    const currentCode = codeLanguages ? codeLanguages[lang] : code;
    const lines = currentCode.split('\n');

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(currentCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
            const ta = document.createElement('textarea');
            ta.value = currentCode;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [currentCode]);

    return (
        <div className="glass rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-darker/50">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-secondary/60" />
                    <div className="w-3 h-3 rounded-full bg-warning/60" />
                    <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <span className="text-xs text-text-muted font-mono ml-2">
                    {langFileNames[lang]}
                </span>
                <div className="ml-auto flex items-center gap-1">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1 px-2 py-1 rounded text-xs text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                        title={copied ? t.detail.copied : t.detail.copy}
                    >
                        {copied ? (
                            <>
                                <svg className="w-3.5 h-3.5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-success">{t.detail.copied}</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <span>{t.detail.copy}</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Language Tabs */}
            {codeLanguages && (
                <div className="flex border-b border-white/5 bg-darker/30">
                    {(Object.keys(langLabels) as CodeLanguage[]).map((key) => (
                        <button
                            key={key}
                            onClick={() => setLang(key)}
                            className={`px-4 py-2 text-xs font-mono transition-colors relative ${lang === key
                                ? 'text-primary'
                                : 'text-text-muted hover:text-white'
                                }`}
                        >
                            {langLabels[key]}
                            {lang === key && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Code */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm font-mono leading-relaxed border-collapse">
                    <tbody>
                        {lines.map((line, i) => {
                            const lineNum = i + 1;
                            let isActive = false;

                            if (activeLines && activeLines[lang] !== undefined) {
                                isActive = activeLines[lang] === lineNum;
                            } else if (lang === 'js' && activeLine !== undefined) {
                                isActive = activeLine === lineNum;
                            }
                            return (
                                <tr
                                    key={i}
                                    className={`transition-all duration-200 ${isActive
                                        ? 'bg-primary/15'
                                        : ''
                                        }`}
                                >
                                    <td
                                        className={`w-10 text-right pr-4 pl-4 py-0.5 select-none align-top border-r ${isActive
                                            ? 'text-primary border-primary border-r-2'
                                            : 'text-text-muted border-transparent border-r-2'
                                            }`}
                                        style={{ userSelect: 'none' }}
                                    >
                                        {lineNum}
                                    </td>
                                    <td
                                        className={`pl-4 pr-4 py-0.5 whitespace-pre ${isActive ? 'text-white' : 'text-text-secondary'
                                            }`}
                                    >
                                        {line || ' '}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
