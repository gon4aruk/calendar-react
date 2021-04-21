import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import { getWeekStartDate, generateWeekRange } from './utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCurrentWeek = () => setWeekStartDate(new Date());
  const handleChangeWeek = week =>
    week === 'prev'
      ? setWeekStartDate(new Date(weekStartDate.setDate(weekStartDate.getDate() - 7)))
      : setWeekStartDate(new Date(weekStartDate.setDate(weekStartDate.getDate() + 7)));

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const toggleModalIsOpen = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <Header
        handleCurrentWeek={handleCurrentWeek}
        handleChangeWeek={handleChangeWeek}
        weekDates={weekDates}
        openModal={toggleModalIsOpen}
      />
      <Calendar weekDates={weekDates} modalIsOpen={modalIsOpen} closeModal={toggleModalIsOpen} />
    </>
  );
};

export default App;
