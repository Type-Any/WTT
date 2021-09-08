import {mutate} from 'swr';
import {useApi} from '../../contexts/Api';
import {IPostCategoryRequest} from './types';

export const useCreateCategoryApi = () => {
  const api = useApi();

  return async (body: IPostCategoryRequest) => {
    try {
      const success = await api.post<boolean>('/categories', body);
      if (success) mutate('/categories');
    } catch (error) {
      console.log('error: ', error);
    }
  };
};
