import "./single.scss";

import axios from "axios";
import IconButton from "@mui/material/IconButton";
import { Fragment, useEffect, useMemo, useState } from "react";

import { Box } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

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
import { Edit, Cancel, Save} from "@mui/icons-material";
import Select from "@mui/material/Select";

function CollapsibleTable() {
  const [details, setDetails] = useState([]);
  const [openRows, setOpenRows] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [filteredMenu, setFilteredMenu] = useState([]);

  const [editingItemId, setEditingItemId] = useState("");
  const [editedItemName, setEditedItemName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedQuantity, setEditedQuantity] = useState("");
  const [editedRestaurentName, setEditedRestaurentName] = useState("")

  const statusColors = {
    delivered: "#C0FF86",
    confirmed: "#FCFF8F",
    placed: "#E4B8F9",
    canceled: "#FFC2B3",
  };
  const textColors = {
    delivered: "#03AB07",
    confirmed: "#FF9D02",
    placed: "#9601B1",
    canceled: "#FF1F19",
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
  }, [details]);

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

  const handleEditButtonClick= (item) => {
    console.log(item)
   
    setEditingItemId(item._id)
    setEditedItemName(item.name)
    setEditedPrice(item.price)
    setEditedQuantity(item.quantity)
    setEditedRestaurentName(item.rest_name)
 
  }

  const handleItemNameChange = (e) => {
    
    setEditedItemName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setEditedPrice(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setEditedQuantity(e.target.value);
  }

  const handleRestaurentNameChange = (e) => {
    setEditedRestaurentName(e.target.value)
  }

  const handleOrderSaveChanges = (item,id) => {
    console.log("Save changes for item:", item);
    console.log("Edited Name:", editedItemName);
    console.log("Edited Price:", editedPrice);
    console.log(item._id);
    console.log(id)
    const updatedItem = {
      _id: item._id,
      name: editedItemName,
      price: editedPrice,
      quantity: editedQuantity,
      rest_name: editedRestaurentName,
    };
    console.log('updated itm',updatedItem)
    axios
      .patch(`https://caalm.shop/orders/${id}/${item._id}`, {
        updatedItem:updatedItem,
        
      })
      .then(() => {
        console.log(editedItemName)
        setEditingItemId("");
        setEditedItemName("")
        setEditedPrice("")
        setEditedQuantity("")
        setEditedRestaurentName("")

        axios.get("https://caalm.shop/orders").then((response) => {
          setDetails(response.data);
        });

      })
      .catch((error) => {
        console.log(error)
      })

  }


  const renderOrderStatusCell = (row) => {
    if (editingRowIndex === row._id) {
      return (
        
          <TableCell
            sx={{
              display: "flex",
              flexDirection: "row",
              textTransform: "uppercase",
              "& > *": { borderBottom: "unset", height: "20px" },
            }}
            colSpan={2}
          >
            <Box
              sx={{
                width: 120,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                native
              >
                <option value="placed">Placed</option>
                <option value="confirmed">Confirmed</option>
                <option value="delivered">Delivered</option>
                <option value="canceled">Canceled</option>
              </Select>
            </Box>

            <IconButton size="small" onClick={() => handleSaveClick(row._id)}>
              <Save />
            </IconButton>
            <IconButton size="small" onClick={handleCancelClick}>
              <Cancel />
            </IconButton>
          </TableCell>
        
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
            fontSize: "13px",
            textTransform: "capitalize",
            "& > *": { borderBottom: "unset", height: "20px" },
          }}
          colSpan={2}
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

  const handleSearch = (e) => {
    console.log(e);
    const searchField = e.target.value.toLowerCase();
    console.log("details:", details); // Check the value of details
    console.log("searchField:", searchField);
    const filteredItems = rows.filter(
      (row) =>
        row.user_fullName?.toLowerCase().includes(searchField) ||
        row.user_hostelName?.toLowerCase().includes(searchField) ||
        row.phone_no.includes(searchField) ||
        row.order_pin.includes(searchField)
    );
    setFilteredMenu(filteredItems);
  };

  return (
    <div>
      <div className="search">
        <Box
          display="flex"
          mb="10px"
          type="search"
          width="200px"
          ml="20px"
          justifyContent="end"
          backgroundColor="white"
          borderRadius="10px"
        >
          <InputBase
            sx={{ ml: 2, flex: 1, color: "black" }}
            placeholder="Search"
            onKeyDown={handleSearch}
          />
          <IconButton type="button" sx={{ p: 1, color: "grey" }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </div>
      <div className="orderTable">
        <div className="table">
          <TableContainer
            component={Paper}
            sx={{ height: 540, backgroundColor: "#0F1E1E" }}
          >
            <Table
              className="tableContainer"
              aria-label="collapsible table"
              sx={{
                backgroundColor: "#0F1E1E",
                border: "1px solid gray",
                tableLayout: "auto",
              }}
            >
              <TableHead sx={{ position: "sticky", top: 0, zIndex: 999 }}>
                <TableRow
                  sx={{
                    backgroundColor: "black",
                    "& .MuiTableRow-root": { height: "10px" },
                  }}
                >
                  <TableCell />
                  <TableCell
                    sx={{ fontSize: "13px", width: 200, padding: "5px" }}
                  >
                    PHONE NUMBER
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "13px", width: 300, paddingLeft: "30px" }}
                  >
                    NAME
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px", width: 200 }}>
                    ORDER PIN
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px", height: 20 }}>
                    ORDER STATUS
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px", width: 200 }}>
                    HOSTEL NAME
                  </TableCell>

                  <TableCell sx={{ fontSize: "13px", width: 150 }}>
                    TOTAL BILL
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }}>ORDERED AT </TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {(filteredMenu.length > 0 ? filteredMenu : rows).map((row) => (
                  <Fragment key={row._id}>
                    <TableRow
                      sx={{
                        "& > *": { borderBottom: "unset", height: "20px" },
                      }}
                    >
                      <TableCell sx={{ height: "20px" }}>
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
                        sx={{ fontSize: "12.5px" }}
                        component="th"
                        scope="row"
                      >
                        {row.phone_no}
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12.5px", paddingLeft: "30px" }}
                      >
                        {row.user_fullName}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12.5px" }}>
                        {row.order_pin}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12.5px",
                         
                        }}
                      >
                        {renderOrderStatusCell(row, row.id)}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12.5px" }}>
                        {row.user_hostelName}
                      </TableCell>

                      <TableCell sx={{ fontSize: "12.5px" }}>
                        {row.total_price}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12.5px", width: 150 }}>
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
                          <Box sx={{ margin: 2 }}>
                            <Typography
                              variant="h6"
                              sx={{ marginBottom: 2 }}
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
                                      fontSize: "13px",
                                      backgroundColor: "black",
                                    }}
                                  >
                                    ITEM NAME
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "13px",
                                      backgroundColor: "black",
                                    }}
                                  >
                                    QUANTITY
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "13px",
                                      backgroundColor: "black",
                                    }}
                                  >
                                    PRICE
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "13px",
                                      backgroundColor: "black",
                                    }}
                                  >
                                    RESTAURENT NAME
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      fontSize: "13px",
                                      backgroundColor: "black",
                                    }}
                                  >
                                    ACTIONS
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {Array.isArray(row.order_details) &&
                                  row.order_details.map((item, index) => (
                                    <TableRow key={index}>
                                      {editingItemId===item._id ? (
                                        <>
                                        <TableCell>
                                          <input
                                            type="text"
                                            sx={{textTransform:"uppercase"}}
                                            value={editedItemName}
                                            onChange={handleItemNameChange}
                                          />
                                        </TableCell>
                                        
                                        <TableCell>
                                          <input
                                            type="number"
                                            value={editedQuantity}
                                            onChange={handleQuantityChange}
                                          />
                                        </TableCell> 
                                        <TableCell>
                                          <input
                                            type="number"
                                            value={editedPrice}
                                            onChange={handlePriceChange}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <input  
                                            type="text"
                                            sx={{textTransform:"uppercase"}}
                                            value={editedRestaurentName}
                                            onChange={handleRestaurentNameChange}
                                          />
                                        </TableCell> 
                                        <TableCell>
                                          <button style={{marginTop:"10px",width:"100%"}} onClick={() => handleOrderSaveChanges(item,row._id)}>
                                            Save Changes
                                          </button>
                                        </TableCell>
                                          
                                        </>
                                      ) : (
                                        <>
                                          <TableCell
                                            sx={{
                                              fontSize: "12px",
                                              height: 40,
                                              backgroundColor: "#003C3C",
                                            }}
                                            component="th"
                                            scope="row"
                                          >
                                            {item.name}
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                              fontSize: "12px",
                                              backgroundColor: "#003C3C",
                                            }}
                                          >
                                            {item.quantity}
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                              fontSize: "12px",
                                              backgroundColor: "#003C3C",
                                            }}
                                          >
                                            {item.price}
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                              fontSize: "12px",
                                              backgroundColor: "#003C3C",
                                            }}
                                          >
                                            {item.rest_name}
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                              fontSize: "12px",
                                              backgroundColor: "#003C3C",
                                            }}
                                          >
                                            <IconButton
                                              size="small"
                                              sx={{
                                                marginRight: "6px",
                                                color: "#FF9800",
                                                backgroundColor: "#FBFBA5",
                                                height: "30px",
                                                width: "30px",
                                                borderRadius: "50px",
                                              }}
                                              onClick={() => handleEditButtonClick(item,row._id)}
                                            >
                                              <Edit />
                                            </IconButton>
                                            
                                          </TableCell>
                                        </>
                                      )}
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
    </div>
  );
}

export default CollapsibleTable;
