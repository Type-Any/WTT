import useSWR from 'swr';
import {useApi} from '../../contexts/Api';
import {ITodo} from './types';

export const useGetTodosApi = (categoryId?: number) => {
  const api = useApi();

  const {data, isValidating, error} = useSWR<ITodo[]>('/todos', endpoint =>
    api.get(endpoint, {params: {categoryId}}),
  );

  return {
    todos: data || [],
    loading: !data && isValidating,
    error,
  };
};
