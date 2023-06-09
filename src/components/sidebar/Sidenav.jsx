import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  ProSidebar,
  sidebarClasses,
  menuClasses,
  useProSidebar,
} from "react-pro-sidebar";
import Link from "next/link";
import Box from "@mui/material/Box";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { ColorModeContext, useMode, tokens } from "../../styles/theme";
import { IconButton } from "@mui/material";
import { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const Item = ({ to, title, icon, isCollpased, selected, setSelected }) => {
  return (
    <MenuItem
      component={<Link href={to} />}
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
      active={selected === title}
      onClick={() => setSelected(title)}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidenav = () => {
  const { theme } = useMode();
  const colors = tokens(theme.palette.mode);
  const { collapseSidebar } = useProSidebar();
  const [collpased, setCollapsed] = useState(false);
  const [selected, setSelected] = useState("Home");
  return (
    <Box mb={"32px"}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        m="16px 8px 16px 8px"
      >
        <Typography variant="h5" pb={"20px"}>
          Diabetes Tracker
        </Typography>
        <IconButton
          onClick={() => {
            collapseSidebar();
            setCollapsed(!collpased);
          }}
        >
          <MenuOutlinedIcon />
        </IconButton>
      </Box>
      <Box
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
        mb="16px"
      >
        {collpased ? (
          ""
        ) : (
          <img
            width={100}
            height={100}
            style={{ borderRadius: "50%" }}
            alt="profile-picture"
            src={"../../assets/user.png"}
          />
        )}
      </Box>
      <Box>
        <Sidebar
          rootStyles={
            {
              // color: colors.grey[500],
            }
          }
        >
          <Menu
            menuItemStyles={{
              button: ({ active }) => {
                return {
                  backgroundColor: active ? colors.grey[500] : undefined,
                };
              },
              MenuItem: ({ active }) => {
                // return {
                //   backgroundColor: colors.primary[500],
                //   color: {
                //     light: colors.grey[500],
                //   },
                // };
              },
            }}
          >
            <Item
              to="/"
              title={collpased ? <HomeOutlinedIcon /> : "Home"}
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
                to="/dashboard"
                title="Dashboard"
                selected={selected}
                setSelected={setSelected}
              /> */}
            <Item
              to="/calendar"
              title={collpased ? <CalendarMonthIcon /> : "Calendar"}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu label={collpased ? <AnalyticsIcon /> : "Charts"}>
              <Item
                to="/curve"
                title="BG Curve"
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Menu>
        </Sidebar>
      </Box>
    </Box>
  );
};

export default Sidenav;
