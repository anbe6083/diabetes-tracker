import { tokens } from "@/styles/theme";
import dayjs from "dayjs";
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

type AddInsulinProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setInsulinData: (events: any) => void;
  insulin: number;
  date: Dayjs | null;
  setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  insulinData: any;
  insulinValue: string;
  setInsulinValue: (insulinValue: string) => void;
};

export const AddInsulinModal = ({
  open,
  setOpen,
  setDate,
  setInsulinData,
  insulinData,
  insulinValue,
  setInsulinValue,
  date,
}: AddInsulinProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  type BackdropClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

  const handleSubmit = (event: BackdropClickEvent) => {
    if (event.target === event.currentTarget) {
      setOpen(false);
      setInsulinValue("0");
      return;
    }
    setDate(dayjs());

    const newDataPoint = {
      x: date?.format("YYYY-MM-DD").toString(),
      y: insulinValue,
    };
    const updatedData = [...insulinData];
    updatedData[0].data.push(newDataPoint);
    setInsulinData(updatedData);
    setInsulinValue("0");
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
                  label="Units"
                  variant="outlined"
                  type="number"
                  value={insulinValue}
                  onChange={(e) => setInsulinValue(e.target.value)}
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
