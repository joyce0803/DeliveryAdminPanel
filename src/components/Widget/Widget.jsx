import "./widget.scss"

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import BalanceIcon from '@mui/icons-material/Balance';
import Datatable from "../Datatable/Datatable";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const Widget = ({type}) => {

    const [details, setDetails] = useState([]);
    const [userCount, setUserCount] = useState(0);

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

    useEffect(() => {
        setUserCount(rows.length);
        console.log(userCount) // update user count whenever the rows change
      }, [rows]);

    let data;
    
    let amount
    const diff=20

    switch(type){
       case "user" :
            data={
                title:"USERS",
                isMoney:false,
                link:"See all users",
                icon: <PeopleOutlinedIcon className="icon" style={{color:"#FF1F19" ,backgroundColor:"#FFC2B3"}}/>,
            }; 
            amount=userCount
            break;
        case "order" :
            data={
                title:"ORDERS",
                isMoney:false,
                link:"View all orders",
                icon: <ShoppingCartIcon className="icon" style={{color:"#FF9D02", backgroundColor:"#FBFFC9"}} />,
                
            };
            console.log(userCount)
            break;
        case "earning" :
            data={
                title:"EARNINGS",
                isMoney:true,
                link:"View net earnings",
                icon: <CurrencyRupeeIcon className="icon" style={{backgroundColor:"#CCFFC9", color:"#0AAF00"}} />,
            };
            break;
        case "balance" :
            data={
                title:"BALANCE",
                isMoney:true,
                link:"See details",
                icon: <BalanceIcon className="icon" style={{backgroundColor:"#EBA1F9",color:"#9601B1"}}/>,
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
        <div className="left">
            <span className="title">{data.title}</span>
            
            <span className="counter">{data.isMoney && "₹"} {amount}</span>
            <span className="link">{data.link}</span>
        </div>
        
        <div className="right">
            <div className="percentage positive">
                <KeyboardArrowUpIcon />{diff}%
            </div>
            {data.icon}
        </div>
        </div>
    );
};

export default Widget
