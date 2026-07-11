import { createContext } from "react"

export type BottomSheetConfig = {
    content: React.ReactNode
    snapPoints?: (string | number)[]
    index?: number
    title?: string
    enablePanDownToClose?: boolean
    onClose?: (() => void) | undefined
}

export type BottomSheetContextType = {
    open: (config: BottomSheetConfig) => void,
    close: () => void
}

export const BottomSheetContext = createContext<BottomSheetContextType | null>(null)