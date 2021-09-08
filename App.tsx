import React from 'react';
import AppRouter from './src/components/templates/AppRouter';
import ApiProvider from './src/contexts/Api';
import NavProvider from './src/contexts/Nav';
import {setGlobalProps} from './src/utils/globalProps';
setGlobalProps(); // set global props

const App = () => {
  const onApiError = (error: any) => {
    // TODO: api error callback
  };

  return (
    <NavProvider>
      <ApiProvider onError={onApiError}>
        <AppRouter />
      </ApiProvider>
    </NavProvider>
  );
};

export default App;
