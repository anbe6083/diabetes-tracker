import { Box, Button, colors } from "@mui/material";
import LineChart from "./charts/lineCharts";
import { AddInsulinModal } from "./modals/AddInsulinModal";
import { ColorModeContext, tokens } from "@/styles/theme";
import {
  mockLineDataInsulin,
  mockLineDataBloodSugar,
} from "./../data/mockData";
import { useContext, useState } from "react";
import { Dayjs } from "dayjs";
import { useTheme } from "@mui/material";
import { AddGlucoseModal } from "./modals/AddGlucoseModal";

const GlucoseLineChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [glucoseValue, setGlucoseValue] = useState("0");
  const [bloodSugarData, setBloodSugarData] = useState(mockLineDataBloodSugar);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Add Glucose
      </Button>
      <LineChart
        data={bloodSugarData}
        yUnits={"mg/dL"}
        colors={colors.greenAccent[400]}
      />
      <AddGlucoseModal
        open={open}
        date={date}
        setOpen={setOpen}
        setDate={setDate}
        glucoseValue={glucoseValue}
        setGlucoseValue={setGlucoseValue}
        bloodSugarData={bloodSugarData}
        setBloodSugarData={setBloodSugarData}
      />
    </Box>
  );
};

export default GlucoseLineChart;
