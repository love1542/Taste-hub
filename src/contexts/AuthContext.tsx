import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { STORAGE_KEYS, storageService } from '../services/storageService'
import { TokenManager } from '../services/tokenManager/tokenManager'
import { authManager } from '../api/managers/authManager'
import { getDeviceId } from '../utilites/helper/deviceInfo'

type AuthContextType = {
    isLoading: boolean
    isLogin: boolean
    showOnboarding: boolean
    completeOnboarding: () => Promise<void>
    login: (refreshToken: string) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

type AuthPropiderProps = {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthPropiderProps) => {
    const [isLoading, setIsloading] = useState<boolean>(true)
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [showOnboarding, setshowOnboarding] = useState<boolean>(false)

    useEffect(() => {
        const bootstrap = async () => {
            setIsloading(true);

            try {
                const refreshToken = await TokenManager.getRefreshToken()

                if (refreshToken) {
                    setIsLogin(true)
                    const deviceId = await getDeviceId()
                    const response = await authManager.refreshToken({ refreshToken, deviceId })
                    const tokens = response.data

                    if (response.success && tokens?.accessToken && tokens?.refreshToken) {
                        TokenManager.saveAccessToken(tokens.accessToken)
                        await TokenManager.saveRefreshToken(tokens.refreshToken)
                        setIsLogin(true)
                    } else {
                        await TokenManager.clearTokens()
                        setIsLogin(false)
                    }
                } else {
                    setIsLogin(false)
                }

                const onboarding =
                    (await storageService.get<boolean>(
                        STORAGE_KEYS.showOnboarding
                    )) ?? true;
 
                setshowOnboarding(onboarding);
            } catch (error) {
                console.log(error);
            } finally {
                setIsloading(false);
            }
        };

        bootstrap();
    }, []);

    const login = async (refreshToken: string) => {
        try {
            await TokenManager.saveRefreshToken(refreshToken)
            setIsLogin(true)
        } catch (error) {
            console.log(error)
        }
    }

    const logout = async () => {
        try {
            await TokenManager.clearTokens()
            setIsLogin(false)
        } catch (error) {
            console.log(error)
        } finally {
            setIsloading(false)
        }
    }
    
    const completeOnboarding = async () => {
        const saved = await storageService.set(STORAGE_KEYS.showOnboarding, false)
        if (saved) {
            setshowOnboarding(false)
        }
    }
    
    return (
        <AuthContext.Provider value={{ isLoading, isLogin, showOnboarding, completeOnboarding, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}