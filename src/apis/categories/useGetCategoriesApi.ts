import useSWR from 'swr';
import {useApi} from '../../contexts/Api';
import {ICategory} from './types';

export const useGetCategoriesApi = () => {
  const api = useApi();
  const {data, isValidating, error} = useSWR<ICategory[]>(
    '/categories',
    api.get,
  );

  return {
    categories: data || [],
    loading: !data && isValidating,
    error,
  };
};
