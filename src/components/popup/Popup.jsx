import React from 'react';
import PropTypes from 'prop-types';
import { deleteEvent } from '../../gateway/events';

import './popup.scss';

const Popup = ({ getEventsFromServer, idToDelete }) => {
  const handleDeleteEvent = eventId => {
    deleteEvent(eventId).then(() => {
      getEventsFromServer();
    });
  };

  return (
    <div className="popup">
      <div className="popup__content">
        <button className="delete-event-btn" onClick={() => handleDeleteEvent(idToDelete)}>
          <i className="fas fa-trash delete-event-btn__icon"></i>
          Delete
        </button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  getEventsFromServer: PropTypes.func.isRequired,
  idToDelete: PropTypes.string.isRequired,
};

export default Popup;
