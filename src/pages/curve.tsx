import Box from "@mui/material/Box";
import LineChart from "./../components/charts/lineCharts";
import {
  mockLineDataInsulin,
  mockLineDataBloodSugar,
} from "./../data/mockData";
import { ColorModeContext, tokens } from "@/styles/theme";
import { useTheme } from "@mui/material";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { EditModal } from "@/components/modals/EditModal";
import { AddInsulinModal } from "@/components/modals/AddInsulinModal";
import { Dayjs } from "dayjs";

const BGCurve = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [events, setEvents] = useState([]);
  const [insulinData, setInsulinData] = useState(mockLineDataInsulin);
  const [bloodSugarData, setBloodSugarData] = useState(mockLineDataBloodSugar);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [insulinValue, setInsulinValue] = useState("0");

  const handleOpen = () => {
    setOpen(true);
    // const newDataPoint = {
    //   x: date.toString(),
    //   y: 0,
    // };
    // const updatedData = [...insulinData];
    // updatedData[0].data.push(newDataPoint);
    // setInsulinData(updatedData);
  };

  return (
    <Box>
      <Box>
        <Button variant="contained" onClick={handleOpen}>
          Add Insulin
        </Button>
        <LineChart
          data={insulinData}
          yUnits={"Units"}
          colors={colors.blueAccent[400]}
        />
      </Box>
      <Box>
        <Button variant="contained" onClick={handleOpen}>
          Add Glucose
        </Button>
        <LineChart
          data={bloodSugarData}
          yUnits={"mg/dL"}
          colors={colors.greenAccent[400]}
        />
      </Box>
      <AddInsulinModal
        setInsulinData={setInsulinData}
        insulinData={insulinData}
        insulin={100}
        open={open}
        date={date}
        setOpen={setOpen}
        setDate={setDate}
        insulinValue={insulinValue}
        setInsulinValue={setInsulinValue}
      />
    </Box>
  );
};

export default BGCurve;
