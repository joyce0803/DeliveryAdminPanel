import "./widget.scss";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BalanceIcon from "@mui/icons-material/Balance";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const Widget = ({ type }) => {
  const [details, setDetails] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [earningsCount, setEarningsCount] = useState(0)

  useEffect(() => {
    axios
      .get("https://caalm.shop/orders")
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const rows = useMemo(() => {
    const uniqueUsers = [];
    details.forEach((order) => {
      const user_details = JSON.parse(order.user_details);
      if (user_details != null) {
        const user = user_details[0];
        const isDuplicate = uniqueUsers.some((u) => u.phone_no === user.mob);
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
            img: user.profilePic,
          });
        }
      }
    });
    return uniqueUsers.map((user, index) => ({ ...user, id: index + 1 }));
  }, [details]);

  useEffect(() => {
    setUserCount(rows.length);
  }, [rows]);

  const orders = useMemo(() => {
    const uniqueUsers = [];

    const orderDetails = [];
    let totalEarnings = 0;
    details.forEach((order) => {
      const user_details = JSON.parse(order.user_details);
      if (user_details != null) {
        const user = user_details[0];
        
          uniqueUsers.push({
            phone_no: user.mob,
            full_name: user.fullName,
            registration_num: user.registrationNum,
            email: user.email,
            course_name: user.courseName,
            department_name: user.departmentName,
            hostel_name: user.hostelName,
            insta_id: user.instaId,
            img: user.profilePic,
          });
          orderDetails.push({
            total_price: order.total_price,
          });
          if(order.order_status==='delivered'){
            totalEarnings +=order.total_price
          }
          if(order.order_status==='canceled'){
            totalEarnings -=order.total_price
          }
          
      }
      setEarningsCount(totalEarnings);
    });
    return uniqueUsers.map((user, index) => ({ ...user, id: index + 1 }));
  }, [details]);

  useEffect(() => {
    setOrderCount(orders.length);
  }, [orders]);

  // const earnings = useMemo(() => {
    
  //   details.forEach((order) => {
  //     const orderDetailsArray = JSON.parse(order.order_details);
  //     if (orderDetailsArray !== null) {
        
        
  //     }
  //   });
    
  //   return orderDetails.map((user, index) => ({ ...user, id: index + 1 }));
  // }, [details]);

  let data;

  let amount;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PeopleOutlinedIcon
            className="icon"
            style={{ color: "#FF1F19", backgroundColor: "#FFC2B3" }}
          />
        ),
      };
      amount = userCount;
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartIcon
            className="icon"
            style={{ color: "#FF9D02", backgroundColor: "#FBFFC9" }}
          />
        ),
      };
      amount = orderCount;
      console.log("order count",orderCount)
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <CurrencyRupeeIcon
            className="icon"
            style={{ backgroundColor: "#CCFFC9", color: "#0AAF00" }}
          />
        ),
      };
      amount = earningsCount;
      console.log("earnings", earningsCount)
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <BalanceIcon
            className="icon"
            style={{ backgroundColor: "#EBA1F9", color: "#9601B1" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>

        <span className="counter">
          {data.isMoney && "₹"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>

      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
