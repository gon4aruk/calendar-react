import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { createEvent } from '../../gateway/events.js';
import PropTypes from 'prop-types';

import './modal.scss';

const Modal = ({ isOpen, closeModal, getEventsFromServer }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData({
      title: '',
      description: '',
      date: moment(new Date()).format().slice(0, 10),
      dateFrom: moment(new Date()).format('HH:mm'),
      dateTo: moment(new Date()).format('HH:mm'),
    });
  }, [isOpen]);

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

  if (!isOpen) {
    return null;
  }

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
              <input
                type="time"
                name="dateFrom"
                step="900"
                className="event-form__field"
                value={userData.dateFrom}
                onChange={onChange}
              />
              <span className="validity"></span>
              <span>-</span>
              <input
                type="time"
                name="dateTo"
                step="900"
                className="event-form__field"
                value={userData.dateTo}
                onChange={onChange}
              />
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

// class Modal extends Component {
//   state = null;

//   componentDidMount() {
//     this.setState({
//       title: '',
//       description: '',
//       date: moment(new Date()).format().slice(0, 10),
//       dateFrom: moment(new Date()).format('HH:MM'),
//       dateTo: moment(new Date()).format('HH:MM'),
//     });
//   }

//   onChange = event => {
//     const { name, value } = event.target;

//     this.setState({ [name]: value });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     createEvent(this.state).then(() => {
//       this.props.getEventsFromServer();
//       this.props.closeModal();
//     });
//   };

//   render() {
//     const { isOpen, closeModal } = this.props;

//     if (!isOpen) {
//       return null;
//     }

//     return (
//       <div className="modal overlay">
//         <div className="modal__content">
//           <div className="create-event">
//             <button className="create-event__close-btn" onClick={closeModal}>
//               +
//             </button>
//             <form className="event-form" onSubmit={this.handleSubmit}>
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Title"
//                 className="event-form__field"
//                 value={this.state.title}
//                 onChange={this.onChange}
//               />
//               <div className="event-form__time">
//                 <input
//                   type="date"
//                   name="date"
//                   className="event-form__field"
//                   value={this.state.date}
//                   onChange={this.onChange}
//                 />
//                 <input
//                   type="time"
//                   name="dateFrom"
//                   step="900"
//                   className="event-form__field"
//                   value={this.state.dateFrom}
//                   onChange={this.onChange}
//                 />
//                 <span className="validity"></span>
//                 <span>-</span>
//                 <input
//                   type="time"
//                   name="dateTo"
//                   step="900"
//                   className="event-form__field"
//                   value={this.state.dateTo}
//                   onChange={this.onChange}
//                 />
//               </div>
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 className="event-form__field"
//                 value={this.state.description}
//                 onChange={this.onChange}
//               ></textarea>
//               <button type="submit" className="event-form__submit-btn">
//                 Create
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  getEventsFromServer: PropTypes.func.isRequired,
};

export default Modal;
