import { format } from 'date-fns';

/**
 *  @概要 Date型のdateをyyyy年 MM月 dd日に変換する
 */
export const formatDateToyyyyMMdd = (date: Date): string => {
  return format(date, 'yyyy年 MM月 dd日');
};
