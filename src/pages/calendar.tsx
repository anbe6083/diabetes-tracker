import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Box from "@mui/material/Box";

const Calendar = () => {
  const [events, setEvents] = React.useState([
    { title: "event 1", date: new Date("2023-04-01"), duration: "120" },
    { title: "event 2", date: new Date("2023-04-02"), duration: "120" },
  ]);
  const handleDateClick = (selected: any) => {
    console.log(selected);
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    const title = prompt("Add a new event");
    if (title) {
      setEvents([...events, { title, date: selected.dateStr, duration: "60" }]);
    }
  };
  return (
    <Box m="24px">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
        dateClick={handleDateClick}
        initialView="timeGridDay"
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        slotDuration="00:30:00"
        slotLabelInterval="01:00:00"
        events={events}
      />
    </Box>
  );
};

export default Calendar;
