import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentDateObjectState } from '../../../state/calendar/calendarAtoms';
import { calendarState } from '../../../state/calendar/calendarSelectors';
import useOnClickOutSide from '../../../state/hooks/useOnClickOutSide';
import { EMonthsLongOfYear } from '../../../utils/common/commonEnum';

export type TCalendarTitle = {} & React.ComponentPropsWithoutRef<'caption'>;

const CalendarTitle: FC<TCalendarTitle> = ({ className, ...propsCaption }) => {
  const { currentMonth, currentYear, currentNow } = useRecoilValue(
    calendarState('Asia/Ho_Chi_Minh')
  );
  const setCurrentDateObject = useSetRecoilState(currentDateObjectState);
  const [openBoxMonthYear, setOpenBoxMonthYear] = useState(false);
  const openBoxMonthYearRef = useRef<HTMLHeadingElement | null>(null);
  const listMonthRef = useRef<HTMLUListElement | null>(null);
  const listYearRef = useRef<HTMLUListElement | null>(null);
  useOnClickOutSide(openBoxMonthYearRef, () => {
    setOpenBoxMonthYear(false);
  });

  useEffect(() => {
    const eleMonthActive = document.querySelector(
      '.active-month'
    ) as HTMLElement;
    const eleYearActive = document.querySelector('.active-year') as HTMLElement;

    if (eleMonthActive && listMonthRef.current) {
      listMonthRef.current.scrollTo({
        top:
          eleMonthActive.offsetTop -
          listMonthRef.current.getBoundingClientRect().height / 2 +
          eleMonthActive.clientHeight / 3,
        behavior: 'smooth',
      });
    }

    if (eleYearActive && listYearRef.current) {
      listYearRef.current?.scrollTo({
        top:
          eleYearActive.offsetTop -
          listYearRef.current.getBoundingClientRect().height / 2 +
          eleYearActive.clientHeight / 3,
        behavior: 'smooth',
      });
    }
  }, [openBoxMonthYear]);

  return (
    <caption {...propsCaption} className={`mb-1 md:mb-2 lg:mb-4 ${className}`}>
      <div className="flex text-base justify-between md:text-lg">
        <button
          onClick={() =>
            setCurrentDateObject(
              (date) => new Date(date.setMonth(date.getMonth() - 1))
            )
          }
        >
          <ChevronLeftIcon className="h-5" />
        </button>
        <h1
          ref={openBoxMonthYearRef}
          className="tracking-wider text-slate-700 relative px-4 w-[250px] cursor-pointer"
          onClick={() => setOpenBoxMonthYear((open) => !open)}
        >
          {EMonthsLongOfYear[currentMonth]}, <span>{currentYear}</span>
          {openBoxMonthYear && (
            <div className="absolute shadow-xl bg-white left-1/2 -translate-x-1/2 pt-1">
              <hr className="border-t-2 border-slate-400" />
              <div className="flex h-[200px] justify-center">
                <ul ref={listMonthRef} className="overflow-auto">
                  {Array.from({ length: 12 }).map((_, idx) => (
                    <li
                      key={idx}
                      className={`py-1 px-3 cursor-pointer ${
                        currentMonth === idx
                          ? 'bg-slate-200 active-month'
                          : 'bg-transparent'
                      }`}
                      onClick={(event) => {
                        event.stopPropagation();

                        setCurrentDateObject(
                          (date) => new Date(date.getFullYear(), idx)
                        );
                      }}
                    >
                      {EMonthsLongOfYear[idx]}
                    </li>
                  ))}
                </ul>
                <ul ref={listYearRef} className="overflow-auto">
                  {Array.from({ length: currentNow.getFullYear() - 1969 }).map(
                    (_, idx) => (
                      <li
                        key={idx}
                        className={`py-1 px-4 cursor-pointer ${
                          currentYear === currentNow.getFullYear() - idx
                            ? 'bg-slate-200 active-year'
                            : 'bg-transparent'
                        }`}
                        onClick={(event) => {
                          event.stopPropagation();

                          setCurrentDateObject(
                            (date) => new Date(2022 - idx, date.getMonth())
                          );
                        }}
                      >
                        {currentNow.getFullYear() - idx}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          )}
        </h1>
        <button
          onClick={() =>
            setCurrentDateObject(
              (date) => new Date(date.setMonth(date.getMonth() + 1))
            )
          }
        >
          <ChevronRightIcon className="h-5" />
        </button>
      </div>
    </caption>
  );
};

export default CalendarTitle;
