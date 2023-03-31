import { FaTachometerAlt, FaGem, FaList } from "react-icons/fa";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  ProSidebar,
} from "react-pro-sidebar";
import Link from "next/link";
import Box from "@mui/material/Box";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { styles } from "@/styles/Home.module.css";

const Item = ({ to, title }) => {
  return <MenuItem component={<Link href={to} />}>{title}</MenuItem>;
};

const Sidenav = () => {
  return (
    <Box mb={"32px"}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between" }}
        m="16px 8px 16px 8px"
      >
        <Typography variant="h5" pb={"20px"}>
          Diabetes Tracker
        </Typography>
        <MenuOutlinedIcon />
      </Box>
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        mb="16px"
      >
        <img
          width={100}
          height={100}
          style={{ borderRadius: "50%" }}
          alt="profile-picture"
          src={"../../assets/user.png"}
        />
      </Box>
      <Sidebar>
        <Menu>
          <Item to="/" title="Home" />
          <Item to="/dashboard" title="Dashboard" />
          <Item to="/calendar" title="Calendar" />
          <SubMenu label="Charts">
            <Item to="/curve" title="BG Curve" />
          </SubMenu>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Sidenav;
