import React, { useState, useEffect } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import Popup from './components/popup/Popup.jsx';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';
import { deleteEvent, getEvents } from './gateway/events.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [events, setEvents] = useState(null);
  const [popupInfo, setPopupInfo] = useState({
    popupIsOpen: false,
    idToDelete: null,
    x: null,
    y: null,
  });

  useEffect(() => {
    getEventsFromServer();
  }, []);

  const getEventsFromServer = () => {
    getEvents().then(events => {
      setEvents(events);
    });
  };

  const onChangeWeek = goingTo => {
    if (goingTo === 'today') {
      setWeekStartDate(new Date());
      return;
    }

    const newStartDate =
      goingTo === 'prev'
        ? weekStartDate.setDate(weekStartDate.getDate() - 7)
        : weekStartDate.setDate(weekStartDate.getDate() + 7);

    setWeekStartDate(new Date(newStartDate));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDeleteEvent = eventId => {
    deleteEvent(eventId).then(() => {
      getEventsFromServer();
      closePopup();
    });
  };

  const openPopup = (idToDelete, x, y) => {
    setPopupInfo({ idToDelete, x, y, popupIsOpen: true });
  };

  const closePopup = () => {
    setPopupInfo({ ...popupInfo, popupIsOpen: false });
  };

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  return (
    <>
      <Header onChangeWeek={onChangeWeek} weekDates={weekDates} openModal={openModal} />
      <Calendar weekDates={weekDates} events={events} openPopup={openPopup} />
      <Modal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        getEventsFromServer={getEventsFromServer}
      />
      <Popup popup={popupInfo} handleDeleteEvent={handleDeleteEvent} closePopup={closePopup} />
    </>
  );
};

export default App;
