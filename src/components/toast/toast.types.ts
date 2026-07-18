export type ToastContextType = {
    showToast: (toast: ShowToastParams) => void
}

export type ToastType = 'success' | 'error' | 'info'

export type ShowToastParams = {
    type: ToastType
    message: string | undefined
}
