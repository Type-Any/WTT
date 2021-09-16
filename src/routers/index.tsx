import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppRouter from './AppRouter';

const Router = () => (
  <NavigationContainer>
    <AppRouter />
  </NavigationContainer>
);

export default Router;
