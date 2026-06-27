import React, { Children, createContext, ReactNode } from "react";
import { themeMode, ThemeType } from "../themes";

interface ThemeContextType {
    theme: ThemeType
    mode: themeMode
    isDark: boolean
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: {} as ThemeType,
    mode: 'light',
    isDark: false,
    toggleTheme: () => {}
})



