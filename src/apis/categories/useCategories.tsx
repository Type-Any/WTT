import useSWR from 'swr';
import {useApi} from '../../contexts/Api';
import {IResponseBase} from '../../contexts/Api/types';

export interface ICategory {
  id: number;
  name: string;
}

export const useCategoriesApi = () => {
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
