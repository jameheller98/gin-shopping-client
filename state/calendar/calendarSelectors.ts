import { selectorFamily } from 'recoil';
import { CalendarCentral } from '../../utils/common/commonClass';
import { currentDateObjectState } from './calendarAtoms';

const calendar = new CalendarCentral();

const calendarState = selectorFamily({
  key: 'CalendarState',
  get:
    (timeZone: string) =>
    ({ get }) => {
      const currentDateObjectTimeZone = new Date(
        get(currentDateObjectState).toLocaleString('en-US', { timeZone })
      );
      const currentYear = currentDateObjectTimeZone.getFullYear();
      const currentMonth = currentDateObjectTimeZone.getMonth();
      const daysInCalendar = [1, 2, 3, 4, 5, 6, 0];
      const datesOfMonth = calendar.handleDatesOfMonth(
        currentYear,
        currentMonth
      );
      const datesInCalendar = calendar.handleFillDatesOfMonth(
        currentYear,
        currentMonth,
        datesOfMonth
      );
      const datesLengthInCalendar = datesInCalendar.length;
      const daysLengthInCalendar = daysInCalendar.length;
      const numberRowCalendar = Math.ceil(
        datesLengthInCalendar / daysLengthInCalendar
      );
      const currentNow = new Date(
        new Date().toLocaleString('en-US', { timeZone })
      );

      return {
        currentMonth,
        daysInCalendar,
        numberRowCalendar,
        datesInCalendar,
        daysLengthInCalendar,
        currentNow,
        currentYear,
      };
    },
});

export { calendarState };
