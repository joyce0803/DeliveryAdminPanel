import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import StoreIcon from "@mui/icons-material/Store";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.lightgreen[200] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: "#003C3C !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 25px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#25C87A !important",
        },
        "& .pro-menu-item.active": {
          color: "#25C87A !important",
        },
        
        
      }}
    >
      <ProSidebar collapsed={isCollapsed} width="250px" >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 10px 20px 0",
              color: colors.lightgreen[200],
            }}
          >
            {!isCollapsed && (
              <Box
                // position="fixed"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="40px"
              >
                <Typography variant="h4" color={colors.lightgreen[200]}>
                  ADMIN
                </Typography>
                <IconButton
                  style={{ color: colors.lightgreen[200] }}
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box mt="23px" paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              // mt="20px"
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h7"
              color={colors.grey[400]}
              sx={{ m: "19px 0 8px 20px" }}
            >
              Data
            </Typography>

            <Item
              title="Users"
              to="/users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Restaurents"
              to="/restaurents"
              icon={<StoreIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Orders"
              to="/orders"
              icon={<ShoppingCartIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Delivery"
              to="/calendar"
              icon={<LocalShippingIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h7"
              color={colors.grey[400]}
              sx={{ m: "5px 0 8px 20px" }}
            >
              Pages
            </Typography>

            <Item
              title="Stats"
              to="/faq"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Notifications"
              to="/bar"
              icon={<NotificationsActiveIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            
            <Item
              title="Settings"
              to="/geography"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Profile"
              to="/geography"
              icon={<AccountCircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Logout"
              to="/geography"
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
