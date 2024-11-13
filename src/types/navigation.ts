import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';
import About from '@src/templates/settings/About';

export type RouteStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  PasswordOne: undefined;
  Terms: {type: number};
  Policy: {type: number};
  About: undefined;
};

export type StackNavigation = StackNavigationProp<RouteStackParamList>;
export type SplashNavigation = NativeStackScreenProps<
  RouteStackParamList,
  'Splash'
>;
export type HomeNavigation = NativeStackScreenProps<
  RouteStackParamList,
  'Home'
>;

export type PasswordOneNavigation = NativeStackScreenProps<
  RouteStackParamList,
  'PasswordOne'
>;

export type TermsOneNavigation = NativeStackScreenProps<
  RouteStackParamList,
  'Terms'
>;
export type AboutNavigation = NativeStackScreenProps<
  RouteStackParamList,
  'About'
>;
