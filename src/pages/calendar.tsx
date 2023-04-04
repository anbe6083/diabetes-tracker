import Box from "@mui/material/Box";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useState } from "react";

const Calendar = () => {
  const [events, setEvents] = useState([
    { title: "event 1", date: "2023-04-01" },
    { title: "event 2", date: "2023-04-02" },
  ]);
  const handleDateClick = () => {
    alert("clicked");
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventClick={handleDateClick}
      select={handleDateClick}
    />
  );
};

export default Calendar;
