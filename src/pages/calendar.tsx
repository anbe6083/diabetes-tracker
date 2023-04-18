import { useContext, useState, FC } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Box from "@mui/material/Box";
import { Modal, TextField, Typography, Button, useTheme } from "@mui/material";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputAdornment from "@mui/material/InputAdornment";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { tokens, ColorModeContext } from "@/styles/theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [events, setEvents] = useState([
    {
      title: "Glucose Reading",
      date: new Date("2023-04-01"),
      duration: "120",
      backgroundColor: colors.blueAccent[400],
      insulinValue: "",
      glucoseValue: "",
      mealDescription: "Test",
    },
    {
      title: "Glucose Reading",
      date: new Date("2023-04-02"),
      duration: "120",
      backgroundColor: colors.blueAccent[400],
      insulinValue: "",
      glucoseValue: "",
      mealDescription: "Test",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [glucoseValue, setGlucoseValue] = useState("0");
  const [insulinValue, setInsulinValue] = useState("0");
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("Glucose Reading");
  const [mealDescription, setMealDescription] = useState("");
  const [background, setBackground] = useState(colors.blueAccent[400]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (selected: any, reason: any) => {
    if (reason && reason === "backdropClick") {
      setOpen(false);
      setInsulinValue("0");
      setGlucoseValue("0");
      setMealDescription("");
      setTitle("Glucose Reading");
      return;
    }
    selected.event;
    let newTitle = "";
    if (title === "Glucose Reading") {
      newTitle = `${title}: ${glucoseValue} mg/dL`;
    }
    if (title === "Insulin Injection") {
      newTitle = `${title}: ${insulinValue} units`;
    }
    if (title === "Meal") {
      newTitle = `${title}: ${mealDescription}`;
    }
    setEvents([
      ...events,
      {
        title: newTitle,
        glucoseValue,
        mealDescription,
        insulinValue,
        date,
        duration: "30",
        backgroundColor: background,
      },
    ]);
    setInsulinValue("0");
    setGlucoseValue("0");
    setMealDescription("");
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
    if (e.target.value === "Glucose Reading") {
      setBackground(colors.blueAccent[400]);
    }
    if (e.target.value === "Insulin Injection") {
      setBackground(colors.redAccent[400]);
    }
    if (e.target.value === "Meal") {
      setBackground(colors.greenAccent[400]);
    }
  };

  const handleEventClick = (e: any) => {
    setOpen(true);

    const eventObj = e.event;
    setInsulinValue(eventObj.extendedProps.insulinValue);
    setGlucoseValue(eventObj.extendedProps.glucoseValue);
    setMealDescription(eventObj.extendedProps.mealDescription);
    setTitle(eventObj.title);
    console.log(eventObj);
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

  type EditModalProps = {
    glucoseVal: string;
    insulinVal: string;
    mealDesc: string;
  };

  const EditModal = ({ glucoseVal, insulinVal, mealDesc }: EditModalProps) => {
    return (
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
                ></Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 8 }}>
                  <TextField
                    id="outlined-basic"
                    label="mg/dL"
                    variant="outlined"
                    type="number"
                    value={glucoseVal}
                    onChange={(e) => setGlucoseValue(e.target.value)}
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
                ></Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 8 }}>
                  <TextField
                    id="outlined-basic"
                    label="Units"
                    variant="outlined"
                    type="number"
                    value={insulinVal}
                    onChange={(e) => setInsulinValue(e.target.value)}
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
                ></Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 8 }}>
                  <TextField
                    id="outlined-basic"
                    label="What did your pet eat?"
                    variant="outlined"
                    type="text"
                    value={mealDesc}
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
    );
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
          eventClick={(e) => {
            handleEventClick(e);
          }}
        />
        <EditModal
          insulinVal={insulinValue}
          glucoseVal={glucoseValue}
          mealDesc={mealDescription}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default Calendar;
