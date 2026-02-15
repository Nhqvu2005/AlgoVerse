'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { translations, Locale, TranslationStrings } from '@/lib/i18n';

interface LanguageContextType {
    locale: Locale;
    t: TranslationStrings;
    toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
    locale: 'vi',
    t: translations.vi,
    toggleLocale: () => { },
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>('vi');

    const toggleLocale = useCallback(() => {
        setLocale(prev => (prev === 'vi' ? 'en' : 'vi'));
    }, []);

    const t = translations[locale];

    return (
        <LanguageContext.Provider value={{ locale, t, toggleLocale }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
