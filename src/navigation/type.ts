import { NavigatorScreenParams, TabRouter } from '@react-navigation/native';
import { authRoutes, rootRoutes } from '../constants/appConstants';

export type AuthStackParamList = {
  [authRoutes.login]: undefined;
};

export type RootStackParamList = {
  [rootRoutes.splash]: undefined;
  [rootRoutes.onBoarding]: undefined
  [rootRoutes.auth]: NavigatorScreenParams<AuthStackParamList>;
};


