import { Box, Button, colors } from "@mui/material";
import LineChart from "./charts/lineCharts";
import { tokens } from "@/styles/theme";
import { mockLineDataBloodSugar } from "./../data/mockData";
import { useState } from "react";
import { useTheme } from "@mui/material";
import { AddGlucoseModal } from "./modals/AddGlucoseModal";

const GlucoseLineChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
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
        setOpen={setOpen}
        bloodSugarData={bloodSugarData}
        setBloodSugarData={setBloodSugarData}
      />
    </Box>
  );
};

export default GlucoseLineChart;
