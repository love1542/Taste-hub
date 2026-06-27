import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  login: undefined;
};

export type RootStackParamList = {
  splash: undefined;
  auth: NavigatorScreenParams<AuthStackParamList>;
};

// This registers your root types globally with React Navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
