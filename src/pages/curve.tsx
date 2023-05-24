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
import InsulinLineChart from "@/components/InsulinLineChart";
import GlucoseLineChart from "./../components/GlucoseLineChart";

const BGCurve = () => {
  return (
    <Box>
      <InsulinLineChart />
      <GlucoseLineChart />
    </Box>
  );
};

export default BGCurve;
