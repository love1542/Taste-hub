import { NavigatorScreenParams, TabRouter } from '@react-navigation/native';
import { authRoutes, rootRoutes } from '../constants/appConstants';

export type AuthStackParamList = {
  [authRoutes.login]: undefined;
  [authRoutes.welcome]: undefined;
  [authRoutes.signup]: {signupType: 'email' | 'phone' | 'social'};
  [authRoutes.forgotPassword]: undefined;
};

export type RootStackParamList = {
  [rootRoutes.splash]: undefined;
  [rootRoutes.onBoarding]: undefined
  [rootRoutes.auth]: NavigatorScreenParams<AuthStackParamList>;
};


