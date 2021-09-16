import axios from 'axios';
import {axiosGlobalConfig, IResponseBase} from '../../utils/fetcher';

interface IRequest {
  refreshToken: string;
}

type TResponse = IResponseBase<{
  accessToken: string;
  refreshToken: string;
}>;

export const tokenRefresh = async (data: IRequest) => {
  try {
    const endpoint = '/sign/refresh';
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
