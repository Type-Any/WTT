import {ICategory} from '../apis/categories/types';
import {IDayCateogry} from '../components/molecules/DayListItem';

export const isNone = (value?: any): value is null =>
  value === undefined || value === null;

export const isSome = (value?: any): value is NonNullable<any> =>
  value !== undefined && value !== null;

export const isString = (value?: any): value is string =>
  typeof value === 'string';

export const isNumber = (value?: any): value is number =>
  typeof value === 'number';

export const isBoolean = (value?: any): value is boolean =>
  typeof value === 'boolean';

export const isDayCategoryType = (
  value: ICategory | IDayCateogry,
): value is IDayCateogry => {
  const {type} = (value as any) || {};
  return !!type;
};
