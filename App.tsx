import React from 'react';
import Router from './src/routers';
import AuthProvider from './src/contexts/Auth';
import {setGlobalProps} from './src/utils/globalProps';
setGlobalProps(); // set global props

const App = () => (
  <AuthProvider>
    <Router />
  </AuthProvider>
);

export default App;
