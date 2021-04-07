import React from 'react';
import PropTypes from 'prop-types';

import './event.scss';

const Event = ({ height, marginTop, title, time, id, openPopup }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const onClick = event => {
    const y = event.pageY;
    const x = event.pageX;

    openPopup(id, x, y);
  };

  return (
    <div style={eventStyle} className="event" onClick={onClick}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
    </div>
  );
};

Event.propTypes = {
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  openPopup: PropTypes.func.isRequired,
};

export default Event;
