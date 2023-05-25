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
import { calculateAverage } from "./../../utils/helperFunctions";

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
  insulinData: any;
};

type DataPoint = {
  x: string;
  y: number;
};

export const AddInsulinModal = ({
  open,
  setOpen,
  setInsulinData,
  insulinData,
}: AddInsulinProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [insulinValue, setInsulinValue] = useState("0");
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

    const existingDataPoints = insulinData[0].data.filter((dataPoint: any) => {
      return dataPoint.x === newDataPoint.x;
    });

    const updatedData = [...insulinData];
    if (existingDataPoints.length > 0) {
      const existingValues = existingDataPoints.map(
        (point: DataPoint) => point.y
      );
      const average = calculateAverage([...existingValues, newDataPoint.y]);
      existingDataPoints.forEach((point: DataPoint) => {
        point.y = average;
      });
      setInsulinData(updatedData);
    } else {
      updatedData[0].data.push(newDataPoint);
      setInsulinData(updatedData);
    }
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
            <Box onClick={handleSubmit} mt="8px">
              <Button variant="contained">Submit</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};
