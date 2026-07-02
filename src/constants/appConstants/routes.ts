import onBoarding from "../../screens/onboarding/OnBoarding"

export const rootRoutes = {
    splash: 'splash',
    auth: 'auth',
    onBoarding: 'onBoarding'
} as const

export const authRoutes = {
    home: 'home',
    login: 'login',
    signup: 'signup',
    welcome: 'welcome',
    forgotPassword: 'forgotPassword'
} as const

export const appRoutes = {
    home: 'home'
} as const