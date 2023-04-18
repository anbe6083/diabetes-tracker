import Box from "@mui/material/Box";
import LineChart from "./../components/charts/lineCharts";
import {
  mockLineDataInsulin as insulinData,
  mockLineDataBloodSugar as sugarData,
} from "./../data/mockData";
import { ColorModeContext, tokens } from "@/styles/theme";
import { useTheme } from "@mui/material";
import { useContext } from "react";

const BGCurve = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box>
      <LineChart
        data={insulinData}
        yUnits={"Units"}
        colors={colors.blueAccent[400]}
      />
      <LineChart
        data={sugarData}
        yUnits={"mg/dL"}
        colors={colors.greenAccent[400]}
      />
    </Box>
  );
};

export default BGCurve;
