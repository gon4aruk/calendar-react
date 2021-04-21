import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';
import { getEvents } from '../../gateway/events';

import './calendar.scss';

const Calendar = ({ weekDates, modalIsOpen, closeModal }) => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    getEventsFromServer();
  }, []);

  const getEventsFromServer = () => {
    getEvents().then(events => {
      setEvents(events);
    });
  };

  return (
    <>
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar />
            <Week weekDates={weekDates} events={events} getEventsFromServer={getEventsFromServer} />
          </div>
        </div>
      </section>
      {modalIsOpen && <Modal closeModal={closeModal} getEventsFromServer={getEventsFromServer} />}
    </>
  );
};

Calendar.propTypes = {
  weekDates: PropTypes.array.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Calendar;
