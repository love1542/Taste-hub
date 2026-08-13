import { View, Text } from 'react-native'
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { loginUserStorage } from '../screens/auth/types/auth.types'
import { STORAGE_KEYS, storageService } from '../services/storageService'

type AuthContextType = {
    isLoading: boolean
    isLogin: boolean
    showOnboarding: boolean
    login: (user: loginUserStorage) => void
    logout: () => void
    userId: string
}

export const AuthContext = createContext<AuthContextType | null>(null)

type AuthPropiderProps = {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthPropiderProps) => {
    const [isLoading, setIsloading] = useState<boolean>(true)
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [showOnboarding, setshowOnboarding] = useState<boolean>(false)
    const [userId, setUserId] = useState<string>('')

    useEffect(() => {
        const bootstrap = async () => {
            setIsloading(true);

            try {
                const token = await storageService.get<loginUserStorage>(
                    STORAGE_KEYS.loginUser
                );

                const onboarding =
                    (await storageService.get<boolean>(
                        STORAGE_KEYS.showOnboarding
                    )) ?? true;

                setUserId(token?.userId ?? "")  
                setIsLogin(!!token);
                setshowOnboarding(onboarding);
            } catch (error) {
                console.log(error);
            } finally {
                setIsloading(false);
            }
        };

        bootstrap();
    }, []);

    const login = async (user: loginUserStorage) => {
        setIsloading(true)
        try {
            await storageService.set<loginUserStorage>(STORAGE_KEYS.loginUser, user)
            setIsLogin(true)
        } catch (error) {
            console.log(error)
        } finally {
            setIsloading(false)
        }
    }

    const logout = async () => {
        try {
            await storageService.remove(STORAGE_KEYS.loginUser)
            setIsLogin(false)
        } catch (error) {
            console.log(error)
        } finally {
            setIsloading(false)
        }
    }
    
    return (
        <AuthContext.Provider value={{ isLoading, isLogin, showOnboarding, login, logout, userId }}>
            {children}
        </AuthContext.Provider>
    )
}