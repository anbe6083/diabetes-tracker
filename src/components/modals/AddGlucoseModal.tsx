import dayjs from "dayjs";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

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

type AddGlucoseProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  bloodSugarData: any;
  setBloodSugarData: (events: any) => void;
};

export const AddGlucoseModal = ({
  open,
  setOpen,
  bloodSugarData,
  setBloodSugarData,
}: AddGlucoseProps) => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [glucoseValue, setGlucoseValue] = useState("0");

  type BackdropClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

  const handleSubmit = (event: BackdropClickEvent) => {
    if (event.target === event.currentTarget) {
      setOpen(false);
      setGlucoseValue("0");
      return;
    }
    setDate(dayjs());

    const newDataPoint = {
      x: date?.format("YYYY-MM-DD").toString(),
      y: glucoseValue,
    };
    const updatedData = [...bloodSugarData];
    updatedData[0].data.push(newDataPoint);
    setBloodSugarData(updatedData);
    setGlucoseValue("0");
    setOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal
        open={open}
        onClose={handleSubmit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box minWidth={120}>
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
              <DatePicker onChange={(e) => setDate(e as Dayjs)} />
            </Box>
            <div onClick={handleSubmit}>
              <Button variant="contained">Submit</Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};
