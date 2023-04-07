import { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Box from "@mui/material/Box";
import { Modal, TextField, Typography, Button } from "@mui/material";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputAdornment from "@mui/material/InputAdornment";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      title: "Glucose Reading",
      date: new Date("2023-04-01"),
      duration: "120",
      reading: "120",
    },
    {
      title: "Glucose Reading",
      date: new Date("2023-04-02"),
      duration: "120",
      reading: "251",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [glucoseValue, setValue] = useState("0");
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("Glucose Reading");
  const [mealDescription, setMealDescription] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (selected: any, reason: any) => {
    if (reason && reason === "backdropClick") {
      setOpen(false);
      return;
    }

    setEvents([
      ...events,
      {
        title,
        reading: glucoseValue,
        date,
        duration: "30",
      },
    ]);
    setOpen(false);
    setDate(new Date());
  };

  const handleDateClick = (selected: any) => {
    handleOpen();
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    const clickedDate = selected.date;
    setDate(clickedDate);
  };

  const handleTitleChange = (e: SelectChangeEvent) => {
    setTitle(e.target.value as string);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
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
        <Modal
          open={open}
          onClose={handleSubmit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box minWidth={120}>
              <InputLabel id="title-select-label">Title</InputLabel>
              <Select
                labelId="title-select-label"
                id="title-select"
                value={title}
                label="Title"
                onChange={handleTitleChange}
              >
                <MenuItem value="Glucose Reading">Glucose Reading</MenuItem>
                <MenuItem value="Insulin Injection">Insulin Injection</MenuItem>
                <MenuItem value="Meal">Meal</MenuItem>
              </Select>
              {title === "Glucose Reading" && (
                <Box>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Glucose
                  </Typography>
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2, mb: 8 }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="mg/dL"
                      variant="outlined"
                      type="test"
                      value={mealDescription}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </Typography>
                </Box>
              )}
              {title === "Insulin Injection" && (
                <Box>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Insulin
                  </Typography>
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2, mb: 8 }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Units"
                      variant="outlined"
                      type="number"
                      value={glucoseValue}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </Typography>
                </Box>
              )}
              {title === "Meal" && (
                <Box>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Meal
                  </Typography>
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2, mb: 8 }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Carbs"
                      variant="outlined"
                      type="text"
                      value={mealDescription}
                      onChange={(e) => setMealDescription(e.target.value)}
                    />
                  </Typography>
                </Box>
              )}
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </LocalizationProvider>
  );
};

export default Calendar;
