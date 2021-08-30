import {AxiosRequestConfig} from 'axios';

interface IAuthContext {
  isLoggedIn: boolean | null;
  loginAction: (email: string, password: string) => void;
  logoutAction: () => void;
}

interface IResponseBase<T = any> {
  ok: boolean;
  message: string | null;
  result: T;
}

interface ApiInstance {
  get: <Res = any>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ) => Promise<IResponseBase<Res>>;
  post: <Res = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => Promise<IResponseBase<Res>>;
  patch: <Res = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => Promise<IResponseBase<Res>>;
  delete: <Res = any>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ) => Promise<IResponseBase<Res>>;
}
