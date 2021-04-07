import React from 'react';
import PropTypes from 'prop-types';

import './popup.scss';

const Popup = ({ popup, handleDeleteEvent }) => {
  const { popupIsOpen, idToDelete, x, y } = popup;

  if (!popupIsOpen) {
    return null;
  }
  const styles = {
    top: `${y}px`,
    left: `${x}px`,
  };
  return (
    <div className="popup overlay">
      <div className="popup__overlay"></div>
      <div className="popup__content" style={styles}>
        <button className="delete-event-btn" onClick={() => handleDeleteEvent(idToDelete)}>
          Delete
        </button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  popup: PropTypes.object.isRequired,
  handleDeleteEvent: PropTypes.func.isRequired,
};

export default Popup;
