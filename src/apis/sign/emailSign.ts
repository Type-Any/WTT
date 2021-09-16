import axios, {AxiosRequestConfig} from 'axios';
import {axiosGlobalConfig, IResponseBase} from '../../utils/fetcher';

interface IRequest {
  email: string;
  password: string;
}

type TResponse = IResponseBase<{
  accessToken: string;
  refreshToken: string;
}>;

export const emailSign = async (data: IRequest) => {
  try {
    const endpoint = '/sign/email';
    const response = await axios.post<TResponse>(
      endpoint,
      data,
      axiosGlobalConfig,
    );
    if (!response?.data?.ok) throw response;
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
};
