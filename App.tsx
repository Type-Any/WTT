import React from 'react';
import Router from './src/routers';
import ApiProvider from './src/contexts/Api';
import NavProvider from './src/contexts/Nav';
import {setCustomTouchableOpacity} from 'react-native-global-props';

setCustomTouchableOpacity({
  activeOpacity: 0.6,
});

const App = () => {
  const onApiError = (error: any) => {
    // TODO: api error callback
  };

  return (
    <NavProvider>
      <ApiProvider onError={onApiError}>
        <Router />
      </ApiProvider>
    </NavProvider>
  );
};

export default App;
