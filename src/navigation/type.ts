import { NavigatorScreenParams, TabRouter } from '@react-navigation/native';
import { appRoutes, authRoutes, MainTabRoutes, rootRoutes } from '../constants/appConstants';
import { SignUpType } from '../screens/auth/types/auth.types';

export type AuthStackParamList = {
  [authRoutes.login]: undefined;
  [authRoutes.signup]: { signupType: SignUpType };
  [authRoutes.forgotPassword]: undefined;
};

export type RootStackParamList = {
  [rootRoutes.splash]: undefined;
  [rootRoutes.onBoarding]: undefined
  [rootRoutes.auth]: NavigatorScreenParams<AuthStackParamList>;
  [rootRoutes.app]: NavigatorScreenParams<AppStackParamList>;
};

export type BottomTabParamList = {
    [MainTabRoutes.home]: undefined;
    [MainTabRoutes.favourites]: undefined;
    [MainTabRoutes.orders]: undefined;
    [MainTabRoutes.profile]: undefined;
}

export type AppStackParamList = {
  [appRoutes.mainTabs]: NavigatorScreenParams<BottomTabParamList>;
  [appRoutes.RestaurantDetail]:  {restaurantId: string;};
}


