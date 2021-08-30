import React, {useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import EmailSignScreen from '../screens/EmailSignScreen';
import {isNull} from '../utils/typeCheck';
import {RootStackParamList} from '../contexts/Nav/types';
import {useAuth} from '../contexts/Api';
import SignGatewayScreen from '../screens/SignGatewayScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootRouter = () => {
  const {isLoggedIn} = useAuth();

  const initialRouteName = useMemo<keyof RootStackParamList>(
    () => (isLoggedIn ? '/' : '/sign'),
    [isLoggedIn],
  );

  return isNull(isLoggedIn) ? null : (
    <RootStack.Navigator initialRouteName={initialRouteName}>
      <RootStack.Group screenOptions={{headerShown: false}}>
        <RootStack.Screen name={'/'} component={HomeScreen} />
      </RootStack.Group>

      <RootStack.Group
        screenOptions={{headerShown: false, presentation: 'modal'}}>
        <RootStack.Screen name={'/sign'} component={SignGatewayScreen} />
        <RootStack.Screen name={'/sign/email'} component={EmailSignScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootRouter;
