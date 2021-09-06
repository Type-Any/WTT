import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import React, {createContext, FC, useState} from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';
import {ApiInstance, IAuthContext, IResponseBase} from './types';
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
  const {reset} = useNav();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const loginAction = useCallback(
    async (email: string, password: string) => {
      try {
        const tokens = await emailSignApi({email, password});
        await storeTokens(tokens);
        setIsLoggedIn(true);
        reset('/category');
      } catch (error) {
        console.log('error: ', error);
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
    (async () => {
      (await readTokens()) ? setIsLoggedIn(true) : setIsLoggedIn(false);
    })();
  }, [setIsLoggedIn]);

  // Api Instance Init
  useEffect(() => {
    async function onRequest(config: AxiosRequestConfig) {
      const {accessToken} = (await readTokens()) || {};
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }

    async function onSuccess(response: AxiosResponse<IResponseBase<any>>) {
      if (!response?.data?.ok) throw response;
      return response?.data?.result;
    }

    async function handleError(error: AxiosError<IResponseBase<any>>) {
      onError?.(error);
      const isUnauthorized = error?.response?.status === 401;
      if (isUnauthorized) return refreshTokenAndRetry(error);

      const errorMessage =
        error?.response?.data?.message || error?.message || 'Unexpected Error';

      return Promise.reject(errorMessage);
    }

    async function refreshTokenAndRetry(error: AxiosError<IResponseBase<any>>) {
      const {response: errorRes} = error || {};

      try {
        if (!errorRes) throw errorRes;

        const {refreshToken} = (await readTokens()) || {};
        if (!refreshToken) throw new Error('Refresh Token Required');

        const newTokens = await refreshTokenApi({refreshToken});
        await storeTokens(newTokens);

        const {config} = errorRes || {};

        config.headers.Authorization = `Bearer ${newTokens?.accessToken}`;
        const response = await axios(config);
        return Promise.resolve(response);
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          'Unexpected Error';
        logoutAction();
        Promise.reject(errorMessage);
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
