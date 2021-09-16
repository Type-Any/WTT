import useSWR from 'swr';
import {request} from '../utils/fetcher';

export enum ETodoStatus {
  Todo = 'Todo',
  Done = 'Done',
}

export interface ITodo {
  id: number;
  title: string;
  desc: string;
  status: ETodoStatus;
  dueDate: string; // ISO date string
}

export const useTodos = (categoryId?: number) => {
  const {
    data: todos,
    isValidating,
    ...swrResponses
  } = useSWR<ITodo[]>('/todos', endpoint =>
    request.get(endpoint, {params: {categoryId}}),
  );

  return {
    todos: todos || [],
    loading: !todos && isValidating,
    ...swrResponses,
  };
};
