import useSWR from 'swr';
import {useApi} from '../../contexts/Api';
import {ICategory} from './types';

export const useGetCategoriesApi = () => {
  const api = useApi();
  const {
    data: categories,
    isValidating,
    error,
  } = useSWR<ICategory[]>('/categories', api.get);

  return {
    categories: categories || [],
    loading: !categories && isValidating,
    error,
  };
};
