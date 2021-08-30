import {NavigationContainerRef} from '@react-navigation/native';

type RootStackParamList = {
  '/': undefined;
  '/sign/email': undefined;
};

type NavRef = NavigationContainerRef<RootStackParamList>;

interface INavContext {
  navigate: (to: keyof RootStackParamList) => void;
  reset: (to: keyof RootStackParamList) => void;
}
