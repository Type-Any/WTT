import React, {useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {isNull} from '../utils/typeCheck';
import {RootStackParamList} from '../contexts/Nav/types';
import {useAuth} from '../contexts/Api';

// Screens
import CategoryListScreen from '../screens/CategoryListScreen';
import TodoListScreen from '../screens/TodoListScreen';
import EmailSignScreen from '../screens/EmailSignScreen';
import SignGatewayScreen from '../screens/SignGatewayScreen';

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
        <RootStack.Screen name={'/category'} component={CategoryListScreen} />
        <RootStack.Screen name={'/category/todo'} component={TodoListScreen} />
        <RootStack.Screen name={'/sign'} component={SignGatewayScreen} />
        <RootStack.Screen name={'/sign/email'} component={EmailSignScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootRouter;
