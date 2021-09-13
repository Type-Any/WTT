import dayjs from 'dayjs';

// yyyy-mm-dd => Date
export const dayToDate = (dayStr: string) => dayjs(dayStr).toDate();
