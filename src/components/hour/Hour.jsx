import React from 'react';
import PropTypes from 'prop-types';

import Event from '../event/Event';
import RedLine from '../redLine/RedLine';
import { formatMins, getDateTime } from '../../../src/utils/dateUtils.js';

const Hour = ({ dataHour, hourEvents, handleDeleteEvent, openPopup, dataDayIsNow }) => {
  let redLine;
  if (new Date().getHours() === dataHour && dataDayIsNow) {
    redLine = <RedLine />;
  } else redLine = null;

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {redLine}
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, dateFrom, dateTo, title, date }) => {
        const currentDateFrom = getDateTime(date, dateFrom);
        const currentDateTo = getDateTime(date, dateTo);
        const eventStart = `${currentDateFrom.getHours()}:${formatMins(
          currentDateFrom.getMinutes(),
        )}`;
        const eventEnd = `${currentDateTo.getHours()}:${formatMins(currentDateTo.getMinutes())}`;

        return (
          <Event
            key={id}
            //calculating event height = duration of event in minutes
            height={(currentDateTo.getTime() - currentDateFrom.getTime()) / (1000 * 60)}
            marginTop={currentDateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            id={id}
            openPopup={openPopup}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  hourEvents: PropTypes.array.isRequired,
  openPopup: PropTypes.func.isRequired,
};

export default Hour;
