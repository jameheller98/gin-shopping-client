import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { calendarState } from '../../../state/calendar/calendarSelectors';
import { EDaysShortOfWeek } from '../../../utils/common/commonEnum';

export type TCalendarHeader = {} & React.ComponentPropsWithoutRef<'thead'>;

const CalendarHeader: FC<TCalendarHeader> = ({ className, ...propsTHead }) => {
  const { daysInCalendar } = useRecoilValue(calendarState('Asia/Ho_Chi_Minh'));

  return (
    <thead {...propsTHead} className={`${className}`}>
      <tr className="m-1">
        {daysInCalendar.map((value) => (
          <th
            key={value}
            className="w-12 py-1 text-slate-500 font-semibold md:text-base"
          >
            {EDaysShortOfWeek[value]}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default CalendarHeader;
