import React, {useEffect, useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useIsLoggedIn} from '../contexts/Auth';
import {RootStackParamList} from './types';
import {useAppNav} from '../utils/hooks/useNav';

// Pages
import SignGatewayPage from '../pages/SignGatewayPage';
import EmailSignPage from '../pages/EmailSignPage';
import CategoryListPage from '../pages/CategoryListPage';
import TodoListPage from '../pages/TodoListPage';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const RootRouter = () => {
  const initiated = useRef<boolean>(false);
  const {reset} = useAppNav();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (!initiated.current) {
      initiated.current = true;
    } else {
      reset({
        index: 0,
        routes: [{name: !isLoggedIn ? '/sign' : '/category'}],
      });
    }
  }, [isLoggedIn]);

  return (
    <RootStack.Navigator initialRouteName={'/sign/email'}>
      <RootStack.Group screenOptions={{headerShown: false}}>
        {/* Sign Routes */}
        <RootStack.Screen name={'/sign'} component={SignGatewayPage} />
        <RootStack.Screen name={'/sign/email'} component={EmailSignPage} />

        {/* Service Routes */}
        <RootStack.Screen name={'/category'} component={CategoryListPage} />
        <RootStack.Screen name={'/category/todo'} component={TodoListPage} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootRouter;
