import axios from 'axios';
import {IResponseBase} from '../../contexts/Api/types';

interface IRequest {
  refreshToken: string;
}

interface IResponse {
  accessToken: string;
  refreshToken: string;
}

// Without Axios Instance
export const refreshTokenApi = async (body: IRequest) => {
  try {
    const response = await axios.post<IResponseBase<IResponse>>(
      '/sign/refresh',
      body,
      {baseURL: 'http://localhost:4000'},
    );
    if (!response?.data?.ok) throw response;
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
};
