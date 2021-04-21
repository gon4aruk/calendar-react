// const events = [
//   {
//     id: 1,
//     title: "Go to the gym",
//     description: "some text here",
//     dateFrom: new Date(2020, 8, 15, 10, 15),
//     dateTo: new Date(2020, 8, 15, 15, 0),
//   },
//   {
//     id: 2,
//     title: "Go to the school",
//     description: "hello, 2 am",
//     dateFrom: new Date(2020, 8, 16, 10, 15),
//     dateTo: new Date(2020, 8, 16, 11, 0),
//   },
//   {
//     id: 3,
//     title: "Lunch",
//     description: "",
//     dateFrom: new Date(2020, 8, 17, 10, 30),
//     dateTo: new Date(2020, 8, 17, 11, 30),
//   },
//   {
//     id: 4,
//     title: "Meet friend",
//     description: "at the cafe",
//     dateFrom: new Date(2020, 8, 25, 10, 30),
//     dateTo: new Date(2020, 8, 25, 11, 0),
//   },
// ];

// export default events;

const baseUrl = 'https://60322069081a010017547728.mockapi.io/api/v1/event-react';

export const getEvents = () => fetch(baseUrl).then((response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to load data');
});

export const createEvent = (eventData) => fetch(baseUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(eventData),
}).then((response) => {
  if (!response.ok) {
    throw new Error('Failed to create data');
  }
});

export const deleteEvent = (eventId) => fetch(`${baseUrl}/${eventId}`, {
  method: 'DELETE',
}).then((response) => {
  if (!response.ok) {
    throw new Error('Failed to delete');
  }
});
