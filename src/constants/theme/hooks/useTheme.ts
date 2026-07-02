import { useContext, useMemo } from "react";
import { ThemeContext } from "../contextProvider/ThemeContext";
import { PaletteColors } from "../paletteColors";

export const useTheme =()=> {
    const context = useContext(ThemeContext)
    return useMemo(() => ({
        palletteColors: context.theme.paletteColors,
        color: context.theme.colors,
        scale: context.theme.scale,
        typography: context.theme.typography,
        mode: context.mode,
        toggleTheme: context.toggleTheme,
    }), [context]);
}