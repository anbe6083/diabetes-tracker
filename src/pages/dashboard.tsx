import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Dashboard = () => {
  return (
    <Container>
      <Box display={"flex"} flexDirection={"row"}>
        <Box sx={{ backgroundColor: "red" }}>Box 1</Box>
        <Box sx={{ backgroundColor: "blue" }}>Box 2</Box>
        <Box sx={{ backgroundColor: "green" }}>Box 3</Box>
      </Box>
      <Box display={"flex"} flexDirection={"row"}>
        <Box sx={{ backgroundColor: "red" }}>Box 1</Box>
        <Box sx={{ backgroundColor: "blue" }}>Box 2</Box>
        <Box sx={{ backgroundColor: "green" }}>Box 3</Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
