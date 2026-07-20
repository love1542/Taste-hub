import { useContext, useMemo } from "react";
import { ThemeContext } from "../contextProvider/ThemeContext";
import { Themes } from "../themes";

export const useTheme =()=> {
    const context = useContext(ThemeContext)

    const theme = context?.theme ?? Themes.light
    const mode = context?.mode ?? 'light'
    const toggleTheme = context?.toggleTheme ?? (() => {})

    return useMemo(() => ({
        palletteColors: theme.paletteColors,
        color: theme.colors,
        scale: theme.scale,
        typography: theme.typography,
        mode,
        toggleTheme,
    }), [theme, mode, toggleTheme]);
}