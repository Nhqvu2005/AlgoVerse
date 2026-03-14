'use client';

import { createContext, useContext, ReactNode } from 'react';

// Theme context - currently dark mode only
interface ThemeContextType {
    theme: 'dark';
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    isDark: true,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeContext.Provider value={{ theme: 'dark', isDark: true }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
