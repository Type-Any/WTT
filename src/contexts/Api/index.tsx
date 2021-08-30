import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import React, {createContext, FC, useRef, useState} from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';
import {ApiInstance, IAuthContext} from './types';
import {
  readTokens,
  removeTokens,
  storeTokens,
} from '../../utils/asyncStorage/auth';
import {useNav} from '../Nav';
import {emailSignApi} from '../../apis/sign/emailSignApi';
import {useCallback} from 'react';
import {refreshTokenApi} from '../../apis/sign/refreshTokenApi';

const apiBase = axios.create({
  baseURL: 'http://localhost:4000',
});

const ApiContext = createContext<ApiInstance>(apiBase);

const AuthContext = createContext<IAuthContext>({
  isLoggedIn: null,
  loginAction: () => {},
  logoutAction: () => {},
});

interface IProps {
  onError?: (error?: any) => void;
}

const ApiProvider: FC<IProps> = ({children, onError}) => {
  const initRef = useRef<boolean>(true);
  const {reset} = useNav();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const loginAction = useCallback(
    async (email: string, password: string) => {
      try {
        const tokens = await emailSignApi({email, password});
        await storeTokens(tokens);
        setIsLoggedIn(true);
        reset('/');
      } catch (error) {
        console.log('error: ', error?.response?.data?.message);
      }
    },
    [setIsLoggedIn, reset],
  );

  const logoutAction = useCallback(async () => {
    await removeTokens();
    setIsLoggedIn(false);
    reset('/sign');
  }, [setIsLoggedIn, reset]);

  // Auth Init
  useEffect(() => {
    if (initRef.current) {
      (async () => {
        (await readTokens()) ? setIsLoggedIn(true) : setIsLoggedIn(false);
      })();
      initRef.current = false;
    }
  }, [setIsLoggedIn]);

  // Api Instance Init
  useEffect(() => {
    async function onRequest(config: AxiosRequestConfig) {
      const {accessToken} = (await readTokens()) || {};
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }

    async function onSuccess(response: AxiosResponse<any>) {
      if (!response?.data?.ok) throw response;
      return response?.data;
    }

    async function handleError(error: any) {
      handleError(error);

      const errorCode = error?.response?.status;

      switch (errorCode) {
        case 401:
          return refreshTokenAndRetry(error);
      }

      return Promise.reject(error);
    }

    async function refreshTokenAndRetry(error: any) {
      const {response: errorResponse} = error;

      try {
        const {refreshToken} = (await readTokens()) || {};
        if (!refreshToken) throw new Error('Refresh Token Required');

        const newTokens = await refreshTokenApi({refreshToken});
        await storeTokens(newTokens);

        errorResponse.config.headers.Authorization = `Bearer ${newTokens?.accessToken}`;
        const response = await axios(errorResponse?.config);
        return Promise.resolve(response);
      } catch (error) {
        logoutAction();
        Promise.reject(error);
      }
    }

    apiBase.interceptors.request.use(onRequest);
    apiBase.interceptors.response.use(onSuccess, handleError);
  }, [logoutAction, onError]);

  return (
    <ApiContext.Provider value={apiBase}>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          loginAction,
          logoutAction,
        }}>
        {children}
      </AuthContext.Provider>
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
export const useAuth = () => useContext(AuthContext);

export default ApiProvider;
