export const rootRoutes = {
    splash: 'splash',
    auth: 'auth',
    onBoarding: 'onBoarding',
    app: 'app'
} as const

export const authRoutes = {
    login: 'login',
    signup: 'signup',
    forgotPassword: 'forgotPassword'
} as const

export const MainTabRoutes = {
  home: 'HomeTab',
  orders: 'OrdersTab',
  favourites: 'FavouritesTab',
  profile: 'ProfileTab',
} as const;

export const appRoutes = {
    mainTabs: 'mainTabs',
    RestaurantDetail: 'RestaurantDetail'
} as const