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
  home: 'Home',
  orders: 'Orders',
  favourites: 'Favourites',
  profile: 'Profile',
} as const;

export const appRoutes = {
    mainTabs: 'mainTabs',
    RestaurantDetail: 'RestaurantDetail',
    editProfile: 'EditProfile',
    manageAdress: 'ManageAdress',
    addAdress: 'AddAdress',
    confirmAdress: 'ConfirmAdress'
} as const