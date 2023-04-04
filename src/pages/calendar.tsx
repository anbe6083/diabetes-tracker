import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

const Calendar = () => {
  const [events, setEvents] = React.useState([
    { title: "event 1", date: "2023-04-01" },
    { title: "event 2", date: "2023-04-02" },
  ]);
  const handleDateClick = () => {
    // bind with an arrow function
    const title = prompt("Add a new event");
  };
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      dateClick={handleDateClick}
      events={events}
    />
  );
};

export default Calendar;
