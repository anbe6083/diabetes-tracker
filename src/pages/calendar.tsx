import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

const Calendar = () => {
  const [events, setEvents] = React.useState([
    { title: "event 1", date: new Date("2023-04-01") },
    { title: "event 2", date: new Date("2023-04-02") },
  ]);
  const handleDateClick = (arg: any) => {
    // bind with an arrow function
    const title = prompt("Add a new event");
    if (title) {
      setEvents([...events, { title, date: arg.dateStr }]);
    }
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
