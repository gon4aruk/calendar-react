import React from 'react';
import Hour from '../hour/Hour';
import { getDateTime } from '../../utils/dateUtils';
import PropTypes from 'prop-types';

import './day.scss';

const Day = ({ dataDay, dayEvents, getEventsFromServer }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  const dataDayIsNow = new Date().getDate() === dataDay ? true : false;

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map(hour => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          event => getDateTime(event.date, event.dateFrom).getHours() === hour,
        );

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            getEventsFromServer={getEventsFromServer}
            dataDayIsNow={dataDayIsNow}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dataDay: PropTypes.number.isRequired,
  dayEvents: PropTypes.array.isRequired,
  getEventsFromServer: PropTypes.func.isRequired,
};

export default Day;
