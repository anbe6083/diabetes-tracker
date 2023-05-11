import { tokens } from "@/styles/theme";
import {
  Modal,
  Box,
  InputLabel,
  Select,
  Typography,
  TextField,
  Button,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import MenuItem from "@mui/material/MenuItem";

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
  open: boolean;
  setOpen: (open: boolean) => void;
  setEvents: (events: any) => void;
  events: any;
  date: Date;
  setDate: (date: Date) => void;
};

export const EditModal = ({
  setEvents,
  events,
  open,
  setOpen,
  date,
  setDate,
}: EditModalProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [title, setTitle] = useState("Glucose Reading");
  const [glucoseValue, setGlucoseValue] = useState("0");
  const [insulinValue, setInsulinValue] = useState("0");
  const [mealDescription, setMealDescription] = useState("");
  const [background, setBackground] = useState(colors.blueAccent[400]);

  type BackdropClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

  const handleSubmit = (event: BackdropClickEvent) => {
    console.log(event.nativeEvent);
    if (event.target === event.currentTarget) {
      setOpen(false);
      setInsulinValue("0");
      setGlucoseValue("0");
      setMealDescription("");
      setTitle("Glucose Reading");
      return;
    }
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
                  value={glucoseValue}
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
                  value={insulinValue}
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
                  value={mealDescription}
                  onChange={(e) => setMealDescription(e.target.value)}
                />
              </Typography>
            </Box>
          )}
          <div onClick={handleSubmit}>
            <Button variant="contained">Submit</Button>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};
