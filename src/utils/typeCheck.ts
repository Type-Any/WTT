import {ICategory} from '../apis/categories/types';
import {IDayCateogry} from '../components/molecules/DayListItem';

export const isNull = (value: any): value is null => {
  return value === undefined || value === null;
};

export const isString = (value: any): value is string => {
  return typeof value === 'string';
};

export const isNumber = (value: any): value is string => {
  return typeof value === 'number';
};

export const isDayCategoryType = (
  value: ICategory | IDayCateogry,
): value is IDayCateogry => {
  const {type} = (value as any) || {};
  return !!type;
};
