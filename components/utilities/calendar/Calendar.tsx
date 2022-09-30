import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';
import CalendarTitle from './CalendarTitle';

export type TCalendar = {} & React.ComponentPropsWithoutRef<'table'>;

const Calendar: React.FC<TCalendar> = ({ className, ...propsTable }) => {
  return (
    <table {...propsTable} className={`text-sm ${className}`}>
      <CalendarTitle />
      <CalendarHeader />
      <CalendarBody />
    </table>
  );
};

export default Calendar;
