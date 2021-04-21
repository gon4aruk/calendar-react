import React from 'react';
import Day from '../day/Day';
import { getDateTime } from '../../utils/dateUtils';
import PropTypes from 'prop-types';

import './week.scss';

const Week = ({ weekDates, events, getEventsFromServer }) => {
  if (!events) {
    return null;
  }
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);

        //getting all events from the day we will render
        const dayEvents = events.filter(
          event =>
            getDateTime(event.date, event.dateFrom) > dayStart &&
            getDateTime(event.date, event.dateTo) < dayEnd,
        );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            getEventsFromServer={getEventsFromServer}
          />
        );
      })}
    </div>
  );
};

Week.propTypes = {
  weekDates: PropTypes.array.isRequired,
  events: PropTypes.array,
  getEventsFromServer: PropTypes.func.isRequired,
};

Week.defaultProps = {
  events: null,
};

export default Week;
