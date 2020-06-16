import React from 'react';
import styled from 'styled-components';
import ReactCalendar from 'react-calendar';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const StyledCalendar = styled(ReactCalendar)`
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.16);
  border: none !important;
  border-radius: 15px;
  margin: 15px auto 30px;
  max-width: 350px !important;
  width: 100% !important;
  .react-calendar__navigation {
    border-radius: 15px 15px 0 0;
    background: #656ded !important;
    height: 40px;
    width: 100%;
    margin: 0;
  }
  button.react-calendar__navigation__label,
  .react-calendar__navigation__arrow {
    color: white;
    font-size: 15px;
    font-weight: 500;
  }
  .react-calendar__navigation button[disabled] {
    background: transparent;
    opacity: 0;
  }
  .react-calendar__navigation button:enabled:hover {
    background: transparent;
  }
  .react-calendar__month-view__days {
    background-color: #f8f8f8;
  }
  .react-calendar__month-view__weekdays__weekday {
    background-color: #ebebeb;
    padding-top: 10px;
    height: 38px;
    > abbr {
      text-decoration: none;
      font-size: 15px;
      font-weight: 400;
    }
  }
  .react-calendar__tile {
    color: black;
    font-size: 15px;
  }
  .react-calendar__tile:disabled {
    color: #aaaaaa;
    background: transparent;
  }
  .react-calendar__tile--active {
    color: white;
    border-radius: 5px;
  }
`;

const Calendar = ({ onChange, value, minDate, maxDate }) => {
  return (
    <StyledCalendar
      onChange={onChange}
      value={value}
      minDate={minDate || new Date()}
      maxDate={
        maxDate ||
        new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      }
      formatShortWeekday={(_locate, date) => days[date.getDay()]}
    />
  );
};

export default Calendar;
