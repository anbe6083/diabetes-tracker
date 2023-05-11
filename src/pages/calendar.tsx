import { useState, FC } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { tokens, ColorModeContext } from "@/styles/theme";
import { EditModal } from "@/components/modals/EditModal";

const Calendar = () => {
  const theme = useTheme();

  const [events, setEvents] = useState([
    {
      title: "Glucose Reading",
      date: new Date("2023-04-01"),
      duration: "120",
      backgroundColor: theme.palette.primary.main,
      insulinValue: "",
      glucoseValue: "",
      mealDescription: "Test",
    },
    {
      title: "Glucose Reading",
      date: new Date("2023-04-02"),
      duration: "120",
      backgroundColor: theme.palette.primary.main,
      insulinValue: "",
      glucoseValue: "",
      mealDescription: "Test",
    },
  ]);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDateClick = (selected: any) => {
    handleOpen();
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    const clickedDate = selected.date;
    setDate(clickedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box m="24px">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            listPlugin,
          ]}
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
        <EditModal
          setEvents={setEvents}
          events={events}
          open={open}
          setOpen={setOpen}
          date={date}
          setDate={setDate}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default Calendar;
