import {
  Modal,
  Box,
  InputLabel,
  Select,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { title } from "process";
import { MenuItem } from "react-pro-sidebar";
import style from "styled-jsx/style";

const ReadingModal = ({
  open,
  handleSubmit,
  handleTitleChange,
  setGlucoseValue,
  setInsulinValue,
  setMealDescription,
}) => {
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
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReadingModal;
