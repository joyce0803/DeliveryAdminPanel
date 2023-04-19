import "./single.scss";

import axios from "axios";
import IconButton from "@mui/material/IconButton";
import { Fragment, useEffect, useMemo, useState } from "react";

import { Box } from "@mui/material";

import { InputBase } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import { Edit, Cancel, Save } from "@mui/icons-material";

function CollapsibleTable() {
  const [details, setDetails] = useState([]);
  const [openRows, setOpenRows] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [editingRowIndex, setEditingRowIndex] = useState(-1);

  const statusColors = {
    delivered: "#C0FF86",
    confirmed: "#FCFF8F",
    placed: "#FFC2B3",
  };
  const textColors = {
    delivered: "#03AB07",
    confirmed: "#FF9D02",
    placed: "#FF1F19",
  };

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

  const handleRowClick = (id) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [id]: !prevOpenRows[id],
    }));
  };

  const handleEditClick = (id) => {
    setEditingRowIndex(id);
  };

  const handleCancelClick = () => {
    setEditingRowIndex(-1);
  };

  const handleSaveClick = (id) => {
    axios
      .patch(`https://caalm.shop/orders/${id}`, {
        order_status: newStatus,
      })
      .then(() => {
        setEditingRowIndex(-1);
        setNewStatus("");

        axios.get("https://caalm.shop/orders").then((response) => {
          setDetails(response.data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderOrderStatusCell = (row) => {
    if (editingRowIndex === row._id) {
      return (
        <div>
          <TableCell
            sx={{
              display: "flex",
              flexDirection: "row",
              textTransform: "uppercase",
            }}
          >
            <InputBase
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            />
            <IconButton size="small" onClick={() => handleSaveClick(row._id)}>
              <Save />
            </IconButton>
            <IconButton size="small" onClick={handleCancelClick}>
              <Cancel />
            </IconButton>
          </TableCell>
        </div>
      );
    } else {
      const backgroundColor = statusColors[row.order_status];
      const color = textColors[row.order_status];
      return (
        <TableCell
          sx={{
            borderRadius: 80,
            width: 130,
            display: "flex",
            flexDirection: "row",
            backgroundColor,
            color: color,
            fontWeight: 500,
            fontSize: "16px",
          }}
        >
          {row.order_status}
          <IconButton size="small" onClick={() => handleEditClick(row._id)}>
            <Edit sx={{ color: color }} />
          </IconButton>
        </TableCell>
      );
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const rows = useMemo(() => {
    const orderDetails = [];
    details.forEach((order) => {
      const orderDetailsArray = JSON.parse(order.order_details);
      if (orderDetailsArray !== null) {
        const userDetailsArray = JSON.parse(order.user_details);
        const userDetails = userDetailsArray[0];
        const orderD = orderDetailsArray[0];
        orderDetails.push({
          _id: order._id,
          phone_no: order.phone_no,
          order_status: order.order_status,
          user_fullName: userDetails.fullName,
          user_email: userDetails.email,
          user_courseName: userDetails.courseName,
          user_departmentName: userDetails.departmentName,
          user_hostelName: userDetails.hostelName,
          user_registrationNum: userDetails.registrationNum,
          rest_name: orderD.rest_name,
          menu_id: orderD.menu_id,
          name: orderD.name,
          quantity: orderD.quantity,
          price: orderD.price,
          total_price: order.total_price,
          order_pin: order.order_pin,
          timestamp: order.timestamp,
          confirmed_at: order.confirmed_at,
          order_details: orderDetailsArray,
        });
      }
    });
    return orderDetails.map((user, index) => ({ ...user, id: index + 1 }));
  }, [details]);
  return (
    <div className="orderTable">
      <div className="table">
        <TableContainer
          component={Paper}
          sx={{ height: 580, backgroundColor: "#0F1E1E" }}
        >
          <Table
            className="tableContainer"
            aria-label="collapsible table"
            sx={{ backgroundColor: "#0F1E1E", border: "1px solid gray" }}
          >
            <TableHead sx={{ position: "sticky", top: 0, zIndex: 999 }}>
              <TableRow sx={{ backgroundColor: "black" }}>
                <TableCell />
                <TableCell sx={{ fontSize: "17px", width: 200 }}>
                  PHONE NUMBER
                </TableCell>
                <TableCell sx={{ fontSize: "17px", width: 300 }}>
                  NAME
                </TableCell>
                <TableCell sx={{ fontSize: "17px", width: 200 }}>
                  ORDER PIN
                </TableCell>
                <TableCell sx={{ fontSize: "17px" }}>ORDER STATUS</TableCell>
                <TableCell sx={{ fontSize: "17px", width: 200 }}>
                  HOSTEL NAME
                </TableCell>
                <TableCell sx={{ fontSize: "17px", width: 250 }}>
                  REST NAME
                </TableCell>
                <TableCell sx={{ fontSize: "17px", width: 150 }}>
                  TOTAL BILL
                </TableCell>
                <TableCell sx={{ fontSize: "17px" }}>ORDERED AT </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Fragment key={row._id}>
                  <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleRowClick(row.id)}
                      >
                        {openRows[row.id] ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "15px" }}
                      component="th"
                      scope="row"
                    >
                      {row.phone_no}
                    </TableCell>
                    <TableCell sx={{ fontSize: "15px" }}>
                      {row.user_fullName}
                    </TableCell>
                    <TableCell sx={{ fontSize: "15px" }}>
                      {row.order_pin}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "15px",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      {renderOrderStatusCell(row, row.id)}
                    </TableCell>
                    <TableCell sx={{ fontSize: "15px" }}>
                      {row.user_hostelName}
                    </TableCell>
                    <TableCell sx={{ fontSize: "15px" }}>
                      {row.rest_name}
                    </TableCell>
                    <TableCell sx={{ fontSize: "15px" }}>
                      {row.total_price}
                    </TableCell>
                    <TableCell sx={{ fontSize: "15px", width: 150 }}>
                      {formatDate(row.timestamp)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={openRows[row.id]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ margin: 3 }}>
                          <Typography
                            variant="h4"
                            sx={{ marginBottom: 3 }}
                            gutterBottom
                            component="div"
                          >
                            Order Details
                          </Typography>
                          <Table size="small" aria-label="orders">
                            <TableHead>
                              <TableRow>
                                <TableCell
                                  sx={{
                                    fontSize: "16px",
                                    backgroundColor: "black",
                                  }}
                                >
                                  ITEM NAME
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "16px",
                                    backgroundColor: "black",
                                  }}
                                >
                                  QUANTITY
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "16px",
                                    backgroundColor: "black",
                                  }}
                                >
                                  ITEM PRICE
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {row.order_details.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell
                                    sx={{
                                      fontSize: "15px",
                                      height: 50,
                                      backgroundColor: "#003C3C",
                                    }}
                                    component="th"
                                    scope="row"
                                  >
                                    {item.name}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "15px",
                                      backgroundColor: "#003C3C",
                                    }}
                                  >
                                    {item.quantity}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "15px",
                                      backgroundColor: "#003C3C",
                                    }}
                                  >
                                    {item.price}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default CollapsibleTable;
