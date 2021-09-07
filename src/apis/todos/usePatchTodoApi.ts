import {mutate} from 'swr';
import {useApi} from '../../contexts/Api';
import {ETodoStatus, IPatchTodoRequest} from './types';

export const useDoneTodoApi = (categoryId: number) => {
  const api = useApi();

  return async (todoId: number) => {
    try {
      const endpoint = `/todos/${todoId}`;
      const body: IPatchTodoRequest = {
        categoryId,
        status: ETodoStatus.Done,
      };
      const success = await api.patch<boolean>(endpoint, body);
      if (success) mutate('/todos');
    } catch (error: any) {
      console.log('error: ', error);
    }
  };
};

export const useUndoneTodoApi = (categoryId: number) => {
  const api = useApi();

  return async (todoId: number) => {
    try {
      const endpoint = `/todos/${todoId}`;
      const body: IPatchTodoRequest = {
        categoryId,
        status: ETodoStatus.Todo,
      };
      const success = await api.patch<boolean>(endpoint, body);
      if (success) mutate('/todos');
    } catch (error: any) {
      console.log('error: ', error);
    }
  };
};
