import {useState} from 'react';
import {mutate} from 'swr';
import {useApi} from '../../contexts/Api';
import {dayToDate} from '../../utils/parsers';
import {isNumber, isString} from '../../utils/typeCheck';
import {IPostTodoRequest, IPostTodoForm} from './types';

export const usePostTodoApi = () => {
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = (value: IPostTodoForm): IPostTodoRequest => {
    const {categoryId, title, desc, dueDate} = value;

    if (!isNumber(categoryId)) throw Error('categoryId should be number');
    if (!isString(title)) throw Error('title should be string');
    if (!isString(desc)) throw Error('desc should be string');
    if (!isString(dueDate)) {
      throw Error('dueDate should be date string (yyyy-mm-dd)');
    }

    return {categoryId, title, desc, dueDate: dayToDate(dueDate)};
  };

  const excute = async (value: IPostTodoForm) => {
    try {
      const endpoint = '/todos';
      const validated = validate(value);

      setError(null);
      setLoading(true);
      const success = await api.post<boolean>(endpoint, validated);
      if (success) mutate(endpoint);
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setLoading(false);
    }
  };

  return {loading, error, excute};
};
