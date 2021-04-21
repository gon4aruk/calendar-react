import React, { useState } from 'react';
import moment from 'moment';
import { createEvent } from '../../gateway/events.js';
import PropTypes from 'prop-types';
import { timeRange } from '../../utils/dateUtils';

import './modal.scss';

const Modal = ({ closeModal, getEventsFromServer }) => {
  const [userData, setUserData] = useState({
    title: '',
    description: '',
    date: moment(new Date()).format().slice(0, 10),
    dateFrom: moment(new Date()).format('HH:mm'),
    dateTo: moment(new Date()).format('HH:mm'),
  });

  const onChange = event => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    createEvent(userData).then(() => {
      getEventsFromServer();
      closeModal();
    });
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={closeModal}>
            +
          </button>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={userData.title}
              onChange={onChange}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={userData.date}
                onChange={onChange}
              />
              <select
                name="dateFrom"
                className="event-form__field"
                value={userData.dateFrom}
                onChange={onChange}
              >
                {timeRange.map(time => (
                  <option key={Math.random()} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <span>-</span>
              <select
                name="dateTo"
                className="event-form__field"
                value={userData.dateTo}
                onChange={onChange}
              >
                {timeRange.map(time => (
                  <option key={Math.random()} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={userData.description}
              onChange={onChange}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  getEventsFromServer: PropTypes.func.isRequired,
};

export default Modal;
