import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './event.scss';
import Popup from '../popup/Popup';

const Event = ({ height, marginTop, title, time, id, getEventsFromServer }) => {
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const eventStyle = {
    height,
    marginTop,
  };

  return (
    <div style={eventStyle} className="event" onClick={() => setPopupIsOpen(!popupIsOpen)}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      {popupIsOpen && <Popup idToDelete={id} getEventsFromServer={getEventsFromServer} />}
    </div>
  );
};

Event.propTypes = {
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  getEventsFromServer: PropTypes.func.isRequired,
};

export default Event;
