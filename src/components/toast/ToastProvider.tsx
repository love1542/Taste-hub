import React, { createContext } from "react";
import { ShowToastParams, ToastContextType } from "./toast.types";
import Toast from "react-native-toast-message";


export const ToastContext = createContext<ToastContextType | null>(null)

type ToastProviderProps = {
    children: React.ReactNode
}

export const ToastContextProvider = ({children}:ToastProviderProps) =>{

    const showToast = ({ type = 'info', message, }: ShowToastParams) => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom'
    })
  }

    return(
        <ToastContext.Provider value={{showToast}}>
            {children}
            <Toast/>
        </ToastContext.Provider>
    )
}