import "./navbar.scss";

import { IconButton, useTheme } from "@mui/material";
import { useContext} from "react";
import { ColorModeContext } from "../../theme";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Navbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="header"></div>
        <div className="items">
          <div className="item">
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
          </div>
          <div className="item">
            <IconButton>
              <NotificationsOutlinedIcon />
              <div className="counter">1</div>
            </IconButton>
          </div>
          <div className="item">
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
          </div>
          <div className="item">
            <IconButton>
              <PersonOutlinedIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
