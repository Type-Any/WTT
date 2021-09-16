import React, {createContext, FC, useContext, useEffect, useState} from 'react';
import {readTokens} from './storage';
import {subscribeAuth} from './subscription';

const AuthContext = createContext<boolean>(false);

const AuthProvider: FC = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // TODO: make init procedure
    (async () => {
      const tokens = await readTokens();
      if (tokens) setIsLoggedIn(true);
    })();
  }, []);

  useEffect(() => {
    subscribeAuth(setIsLoggedIn);
  }, []);

  return (
    <AuthContext.Provider value={isLoggedIn}>{children}</AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => useContext(AuthContext);

export default AuthProvider;
