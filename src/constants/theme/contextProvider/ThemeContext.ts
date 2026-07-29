import React, { Children, createContext, ReactNode } from "react";
import { themeMode, Themes, ThemeType } from "../themes";

interface ThemeContextType {
    theme: ThemeType
    mode: themeMode
    isDark: boolean
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: Themes.light,
    mode: 'light',
    isDark: false,
    toggleTheme: () => {}
})



