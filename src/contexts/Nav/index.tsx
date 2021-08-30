import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createContext} from 'react';
import {useRef} from 'react';
import {INavContext, NavRef, RootStackParamList} from './types';
import {useContext} from 'react';

const Context = createContext<INavContext>({
  navigate: () => {},
  reset: () => {},
  goBack: () => {},
});

const NavProvider: FC = ({children}) => {
  const navRef = useRef<NavRef | null>(null);

  const navigate = (name: keyof RootStackParamList) => {
    navRef?.current?.navigate?.(name);
  };

  const reset = (name: keyof RootStackParamList) => {
    navRef?.current?.reset?.({
      index: 0,
      routes: [{name}],
    });
  };

  const goBack = () => {
    navRef?.current?.goBack?.();
  };

  return (
    <NavigationContainer ref={navRef}>
      <Context.Provider value={{navigate, reset, goBack}}>
        {children}
      </Context.Provider>
    </NavigationContainer>
  );
};

export const useNav = () => useContext(Context);

export default NavProvider;
