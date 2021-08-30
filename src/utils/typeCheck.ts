export const isNull = (value: any): value is null => {
  if (value === undefined || value === null) return true;
  return false;
};
