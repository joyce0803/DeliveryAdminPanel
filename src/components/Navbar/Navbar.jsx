import "./navbar.scss"

import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState, useEffect, useMemo } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { InputBase } from "@mui/material";
import axios from "axios";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Header from "../Header/Header";

const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [details, setDetails] = useState([]);

  const [value, setValue] =useState('');
  const [dataSource,setDataSource]=useState(details)
  const [tableFilter,setTableFilter]=useState([])

  useEffect(() => {  
    axios
    // .get("https://caalm-delivery-api.onrender.com/orders")
    .get("http://localhost:3000/orders")
    .then((response) => { 
        setDetails(response.data) 
    })
    .catch((error) => {
        console.log(error) 
    });
  }, []);

  const rows = useMemo(() => {
    const uniqueUsers = []; 
    details.forEach((order) => {
        const user_details = JSON.parse(order.user_details); // Parse the user details string
        if(user_details!=null){
            const user = user_details[0]; // Assume there is only one user per order for simplicity
            const isDuplicate = uniqueUsers.some((u) => u.phone_no === user.mob); // Check if user already exists in the unique users array
            if (!isDuplicate) {
                uniqueUsers.push({
                    phone_no: user.mob, 
                    full_name: user.fullName,
                    registration_num: user.registrationNum,
                    email: user.email,
                    course_name: user.courseName,
                    department_name: user.departmentName,
                    hostel_name: user.hostelName,
                    insta_id: user.instaId,
                    img:user.profilePic
                });
            }
        }
    });
    return uniqueUsers.map((user, index) => ({ ...user, id: index + 1 })); // Add unique ID to each row
  }, [details]);

  const filterData=(e) => {
    console.log(e.target.value)
    if(e.target.value != ""){
      setValue(e.target.value);
      const filterTable=dataSource.filter(o => Object.keys(o).some(k =>
        String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        ));
        setTableFilter([...filterTable])
    }
    else{
      setValue(e.target.value)
      setDataSource([...dataSource])
    }
  }

  return (
    <div className="navbar">
       <div className="wrapper">
        
        <div className="header">
          
        </div>
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
  )
}

export default Navbar
