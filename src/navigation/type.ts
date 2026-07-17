import { NavigatorScreenParams, TabRouter } from '@react-navigation/native';
import { authRoutes, rootRoutes } from '../constants/appConstants';
import { SignUpType } from '../screens/auth/types/auth.types';

export type AuthStackParamList = {
  [authRoutes.login]: undefined;
  [authRoutes.welcome]: undefined;
  [authRoutes.signup]: { signupType: SignUpType };
  [authRoutes.forgotPassword]: undefined;
  [authRoutes.home]: undefined;
};

export type RootStackParamList = {
  [rootRoutes.splash]: undefined;
  [rootRoutes.onBoarding]: undefined
  [rootRoutes.auth]: NavigatorScreenParams<AuthStackParamList>;
};


