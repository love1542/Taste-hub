import { ReactNode, useState } from "react"
import { ThemeContext} from "./ThemeContext"
import { themeMode, Themes } from "../themes"

type ThemeProviderPropsType = {
    children: ReactNode
}

export const ThemeProvider = ({children}: ThemeProviderPropsType) => {
    
const [mode, setMode] = useState<themeMode>('light');

    const isDark = mode === 'dark';
    const theme = isDark ? Themes.dark : Themes.light;

    const toggleTheme = () => {
        setMode((prev: themeMode) => (prev === 'light' ? 'dark' : 'light'));
    };
    return(
          <ThemeContext.Provider value={{ theme, mode, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}