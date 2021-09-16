import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {tokenRefresh} from '../apis/sign/tokenRefresh';
import {readTokens, storeTokens} from '../contexts/Auth/storage';
import {broadcastLogout} from '../contexts/Auth/subscription';

export interface IResponseBase<T = any> {
  ok: boolean;
  message: string | null;
  result: T;
}

export const axiosGlobalConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:4000',
};

const instance = axios.create(axiosGlobalConfig);

const onRequest = async (
  config?: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  const {accessToken} = (await readTokens()) || {};
  return {
    ...config,
    headers: {
      ...config?.headers,
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
  };
};

const onSuccess = <T = any>(response: AxiosResponse<IResponseBase<T>>): T => {
  if (!response?.data?.ok) throw response;
  return response?.data?.result;
};

const onError = <T = any>(error: AxiosError<IResponseBase<T>>) => {
  try {
    const isUnauthorized = error?.response?.status === 401;
    if (isUnauthorized) return onUnauthorized(error);

    throw error;
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message || err?.message || 'Unexpected Error';

    throw errorMessage;
  }
};

const onUnauthorized = async <T = any>(error: AxiosError<IResponseBase<T>>) => {
  try {
    const {response: errResponse} = error || {};
    if (!errResponse) throw Error('Unexpected Error');

    const {refreshToken} = (await readTokens()) || {};
    if (!refreshToken) throw Error('Refresh Token Required');

    const newTokens = await tokenRefresh({refreshToken});
    await storeTokens(newTokens);

    const {config} = errResponse || {};
    config.headers.Authorization = `Bearer ${newTokens?.accessToken}`;

    const response = (await axios(config)) as AxiosResponse<IResponseBase<T>>;
    return onSuccess(response);
  } catch (err) {
    broadcastLogout();
    throw err;
  }
};

instance.interceptors.request.use(onRequest);

interface IRequest {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => Promise<T>;
  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => Promise<T>;
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>;
}

export const request: IRequest = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    instance.get<IResponseBase<T>>(url, config).then(onSuccess).catch(onError),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    instance
      .post<IResponseBase<T>>(url, data, config)
      .then(onSuccess)
      .catch(onError),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    instance
      .patch<IResponseBase<T>>(url, data, config)
      .then(onSuccess)
      .catch(onError),

  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    instance
      .delete<IResponseBase<T>>(url, config)
      .then(onSuccess)
      .catch(onError),
};
