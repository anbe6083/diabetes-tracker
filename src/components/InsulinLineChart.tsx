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

const InsulinLineChart = () => {
  const [insulinData, setInsulinData] = useState(mockLineDataInsulin);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [insulinValue, setInsulinValue] = useState("0");

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Add Insulin
      </Button>
      <LineChart
        data={insulinData}
        yUnits={"Units"}
        colors={colors.blueAccent[400]}
      />
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

export default InsulinLineChart;
