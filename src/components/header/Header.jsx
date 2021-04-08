import React from 'react';
import PropTypes from 'prop-types';

import { months } from '../../utils/dateUtils.js';

import './header.scss';

const Header = ({ weekDates, openModal, onChangeWeek }) => {
  const startWeek = weekDates[0];
  const endWeek = weekDates[weekDates.length - 1];

  const currentMonth =
    startWeek.getMonth() === endWeek.getMonth()
      ? `${months[startWeek.getMonth()]}`
      : `${months[startWeek.getMonth()]} - ${months[endWeek.getMonth()]}`;

  const currentYear =
    startWeek.getFullYear() === endWeek.getFullYear()
      ? `${startWeek.getFullYear()}`
      : `${startWeek.getFullYear()} - ${endWeek.getFullYear()}`;

  return (
    <header className="header">
      <button className="button create-event-btn" onClick={openModal}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={() => onChangeWeek('today')}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon" onClick={() => onChangeWeek('prev')}>
          <i className="fas fa-chevron-left" name="prev"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={() => onChangeWeek('next')}>
          <i className="fas fa-chevron-right" name="next"></i>
        </button>
        <span className="navigation__displayed-month">{`${currentMonth} ${currentYear}`}</span>
      </div>
    </header>
  );
};

Header.propTypes = {
  weekDates: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  onChangeWeek: PropTypes.func.isRequired,
};

export default Header;
