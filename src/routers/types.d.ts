import {NavigationContainerRef} from '@react-navigation/native';

type RootStackParamList = {
  '/category': undefined;
  '/category/todo': {categoryId: number};
  '/sign': undefined;
  '/sign/email': undefined;
};

type NavRef = NavigationContainerRef<RootStackParamList>;

type NavigateFunctionType = <RouteName extends keyof RootStackParamList>(
  ...args: undefined extends RootStackParamList[RouteName]
    ?
        | [screen: RouteName]
        | [screen: RouteName, params: RootStackParamList[RouteName]]
    : [screen: RouteName, params: RootStackParamList[RouteName]]
) => void;

interface INavContext {
  navigate: NavigateFunctionType;
  reset: (to: keyof RootStackParamList) => void;
  goBack: () => void;
}
