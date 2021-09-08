import React, {useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../../contexts/Api';
import {RootStackParamList} from '../../contexts/Nav/types';
import {isNull} from '../../utils/typeCheck';

// Pages
import CategoryListPage from '../../pages/CategoryListPage';
import TodoListPage from '../../pages/TodoListPage';
import EmailSignPage from '../../pages/EmailSignPage';
import SignGatewayPage from '../../pages/SignGatewayPage';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const RootRouter = () => {
  const {isLoggedIn} = useAuth();

  const initialRouteName = useMemo<keyof RootStackParamList>(
    () => (isLoggedIn ? '/category' : '/sign'),
    [isLoggedIn],
  );

  return isNull(isLoggedIn) ? null : (
    <RootStack.Navigator initialRouteName={initialRouteName}>
      <RootStack.Group screenOptions={{headerShown: false}}>
        <RootStack.Screen name={'/category'} component={CategoryListPage} />
        <RootStack.Screen name={'/category/todo'} component={TodoListPage} />
        <RootStack.Screen name={'/sign'} component={SignGatewayPage} />
        <RootStack.Screen name={'/sign/email'} component={EmailSignPage} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootRouter;
