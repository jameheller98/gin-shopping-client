import classNames from 'classnames';
import { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentSelectDateObjectState } from '../../../state/calendar/calendarAtoms';
import { calendarState } from '../../../state/calendar/calendarSelectors';

export type TCalendarBody = {} & React.ComponentPropsWithoutRef<'tbody'>;

const CalendarBody: FC<TCalendarBody> = ({ className, ...propsTBody }) => {
  const {
    numberRowCalendar,
    datesInCalendar,
    daysLengthInCalendar,
    currentNow,
  } = useRecoilValue(calendarState('Asia/Ho_Chi_Minh'));
  const [currentSelectDate, setCurrentSelectDate] = useRecoilState(
    currentSelectDateObjectState('Asia/Ho_Chi_Minh')
  );
  const handlecurrentNowClass = (value: Date) =>
    classNames({
      'bg-slate-400 text-slate-50':
        value.toDateString() !== currentSelectDate.toDateString() &&
        value.toDateString() === currentNow.toDateString(),
      'bg-slate-200 text-slate-700':
        value.toDateString() === currentSelectDate.toDateString() &&
        value.toDateString() === currentNow.toDateString(),
      'bg-transparent text-slate-700':
        value.toDateString() !== currentNow.toDateString(),
    });

  const handleSelectDateClass = (value: Date) =>
    classNames({
      'shadow-[inset_0px_0px_0px_1px] shadow-slate-400':
        value.toDateString() === currentSelectDate.toDateString() &&
        value.toDateString() !== currentNow.toDateString(),
      'shadow-[inset_0px_0px_0px_1px] shadow-slate-700':
        value.toDateString() === currentSelectDate.toDateString() &&
        value.toDateString() === currentNow.toDateString(),
      'shadow-none': value.toDateString() !== currentSelectDate.toDateString(),
    });

  return (
    <tbody {...propsTBody} className={`${className}`}>
      {Array.from({ length: numberRowCalendar }).map((_, indexOutside) => {
        return (
          <tr key={indexOutside}>
            {datesInCalendar
              .filter(
                (_, indexInside) =>
                  indexInside >= indexOutside * daysLengthInCalendar &&
                  indexInside <
                    indexOutside * daysLengthInCalendar + daysLengthInCalendar
              )
              .map((value) => {
                return (
                  <td
                    key={value.toDateString()}
                    className={`text-center py-1 cursor-pointer md:py-3 lg:text-base ${handlecurrentNowClass(
                      value
                    )} ${handleSelectDateClass(value)}`}
                    onClick={() => setCurrentSelectDate(value)}
                  >
                    {value.getDate()}
                  </td>
                );
              })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default CalendarBody;
