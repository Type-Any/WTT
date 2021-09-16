import React, {useEffect, useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useIsLoggedIn} from '../contexts/Auth';
import {RootStackParamList} from './types';
import {useAppNav} from '../utils/hooks/useNav';

// Pages
import CategoryListPage from '../pages/CategoryListPage';
// import TodoListPage from '../../pages/TodoListPage';
import EmailSignPage from '../pages/EmailSignPage';
import SignGatewayPage from '../pages/SignGatewayPage';
import {useRoute} from '@react-navigation/core';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const RootRouter = () => {
  const initiated = useRef<boolean>(false);
  const {reset} = useAppNav();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (!initiated.current) {
      initiated.current = true;
    } else {
      console.log('isLoggedIn: ', isLoggedIn);
      const resetTo = isLoggedIn ? '/category' : '/sign/email';
      reset({
        index: 0,
        routes: [{name: resetTo}],
      });
    }
  }, [isLoggedIn]);

  return (
    <RootStack.Navigator initialRouteName={'/sign/email'}>
      <RootStack.Group screenOptions={{headerShown: false}}>
        <RootStack.Screen name={'/category'} component={CategoryListPage} />
        {/* <RootStack.Screen name={'/category/todo'} component={TodoListPage} /> */}
        {/* <RootStack.Screen name={'/sign'} component={SignGatewayPage} /> */}
        <RootStack.Screen name={'/sign/email'} component={EmailSignPage} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootRouter;
