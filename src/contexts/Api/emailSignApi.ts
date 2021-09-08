import axios from 'axios';
import {IResponseBase} from './types';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  accessToken: string;
  refreshToken: string;
}

// Without Axios Instance
export const emailSignApi = async (body: IRequest) => {
  try {
    const response = await axios.post<IResponseBase<IResponse>>(
      '/sign/email',
      body,
      {baseURL: 'http://localhost:4000'},
    );
    if (!response?.data?.ok) throw response;
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
};
