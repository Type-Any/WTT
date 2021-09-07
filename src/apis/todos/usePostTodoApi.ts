import {mutate} from 'swr';
import {useApi} from '../../contexts/Api';
import {IPostTodoRequest} from './types';

export const useCreateTodoApi = () => {
  const api = useApi();

  return async (body: IPostTodoRequest) => {
    try {
      const success = await api.post<boolean>('/todos', body);
      if (success) mutate('/todos');
    } catch (error) {
      console.log('error: ', error);
    }
  };
};
