import { ProSidebarProvider } from "react-pro-sidebar";
import Sidenav from "../sidebar/Sidenav";
import Box from "@mui/material/Box";
import Topbar from "@/components/topbar/topbar";

const Layout = ({ children }) => {
  return (
    <Box className="app" sx={{ display: "flex" }}>
      <Sidenav />
      <Box className="content" backgroundColor="red">
        <Topbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
