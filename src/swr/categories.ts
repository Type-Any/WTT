import useSWR from 'swr';
import {request} from '../utils/fetcher';

export interface ICategory {
  id: number;
  name: string;
}

export const useCategories = () => {
  const {
    data: categories,
    isValidating,
    error,
  } = useSWR<ICategory[]>('/categories', request.get);

  return {
    categories: categories || [],
    loading: !categories && isValidating,
    error,
  };
};
