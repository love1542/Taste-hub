import { useContext, useMemo } from "react";
import { ThemeContext } from "../contextProvider/ThemeContext";

export const useTheme =()=> {
    const context = useContext(ThemeContext)
    return useMemo(() => ({
        color: context.theme.colors,
        spacing: context.theme.Spacing,
        sizes: context.theme.Sizes,
        mode: context.mode,
        toggleTheme: context.toggleTheme,
    }), [context]);
}