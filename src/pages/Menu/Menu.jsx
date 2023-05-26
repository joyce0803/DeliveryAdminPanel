import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  InputBase,
  Box,
  IconButton,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

const Menu = () => {
  const { id } = useParams();
  const { name } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [groupedMenuItems, setGroupedMenuItems] = useState({});
  const [filteredMenu, setFilteredMenu] = useState([]);
  

  const fetchMenuItems = useCallback(() => {
    axios
      .get(`https://caalm.shop/menus/${id}`)
      .then((response) => {
        const items = response.data;
        setMenuItems(items);
        // Update the groupedMenuItems and filteredMenu states
        const newGroupedMenuItems = items.reduce((groupedItems, item) => {
          const { dish_type } = item;
          if (!groupedItems[dish_type]) {
            groupedItems[dish_type] = [item];
          } else {
            groupedItems[dish_type].push(item);
          }
          return groupedItems;
        }, {});
        setGroupedMenuItems(newGroupedMenuItems);
        setFilteredMenu(items);
      })
      .catch((error) => {
        console.log(error);
      });
  },[id]);
  

  useEffect(() => {
    fetchMenuItems();
  }, [id,fetchMenuItems]);
  

  const handleSearch = (e) => {
    const searchField = e.target.value.toLowerCase();
    const filteredItems = menuItems.filter(
      (item) =>
        item.dish_name.toLowerCase().includes(searchField) ||
        item.dish_type.toLowerCase().includes(searchField)
    );
    setFilteredMenu(filteredItems);

    const filteredDishTypes = filteredItems.reduce((dishTypes, item) => {
      if (!dishTypes.includes(item.dish_type)) {
        dishTypes.push(item.dish_type);
      }
      return dishTypes;
    }, []);

    const newGroupedMenuItems = {};
    filteredDishTypes.forEach((type) => {
      newGroupedMenuItems[type] = filteredItems.filter(
        (item) => item.dish_type === type
      );
    });
    setGroupedMenuItems(newGroupedMenuItems);
  };

  // State variables for editable fields
  const [editingItemId, setEditingItemId] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  const handleEditButtonClick=(item)=> {
    console.log(item)
    setEditingItemId(item._id);
    setEditedName(item.dish_name);
    setEditedPrice(item.dish_price);
    
  }

  const handleNameChange = (e) => {
    const capitalizedValue =
    e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setEditedName(capitalizedValue);
  };

  const handlePriceChange = (e) => {
    setEditedPrice(e.target.value);
  };

  const handleSaveChanges = (item) => {
    // Perform API call or update local data with the edited values
    console.log("Save changes for item:", item);
    console.log("Edited Name:", editedName);
    console.log("Edited Price:", editedPrice);
    console.log(item._id);
    console.log(item.rest_id);
  
    
// 110 4 piece
    axios
      .patch(`https://caalm.shop/menus/${item.rest_id}/${item._id}`, {
        dish_name: editedName,
        
        dish_price: editedPrice,
      })
      .then(() => {
        console.log(editedName)
        setEditingItemId("");
        setEditedName("");
        setEditedPrice("");
        fetchMenuItems(); // Fetch the updated menu items
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleDelete=(item) => {
    console.log(item.rest_id)
    console.log(item._id)
    axios
      .delete(`https://caalm.shop/menus/${item.rest_id}/${item._id}`)
      .then(() => {
        console.log("deleted")
        fetchMenuItems()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="listMenu">
      <div className="listContainer">
        <Navbar />
      </div>
      <div
        className="titleAndSearch"
        style={{
          fontSize: "23px",
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          fontWeight: 600,
        }}
      >
        <div className="title">{name} Menu</div>
        <div
          className="search"
          style={{
            justifyContent: "flex-end",
            display: "flex",
          }}
        >
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
      </div>

      <div
        style={{
          marginLeft: "10px",
          marginRight: "10px",
          overflowY: "scroll",
          height: "75vh",
        }}
      >
        <Grid container mt="20px" p="20px" sx={{ color: "#F1F9B8" }}>
          {Object.keys(groupedMenuItems).map((type) => (
            <Grid item xs={12} md={6} lg={3} key={type}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "17px" }}
                variant="h8"
                gutterBottom
              >
                {type}
              </Typography>
              <Grid container spacing={1} sx={{ padding: "10px" }}>
                {filteredMenu
                  .filter((item) => item.dish_type === type)
                  .map((item) => (
                    <Card
                      variant="outlined"
                      sx={{
                        width: 280,
                        height: 100,
                        backgroundColor: "#B5FFDD",
                        color: "black",
                        margin: "4px",
                        fontWeight: "600",
                        ":hover": {
                          backgroundColor: "#003C3C",
                          color: "white",
                          border: "1px solid white",
                        },
                      }}
                      key={item._id}
                    >
                      <CardContent sx={{ paddingTop: "10px",  }}>
                        {editingItemId===item._id ? (
                          // Render editable fields when in edit mode
                          <>
                            <input
                              type="text"
                              sx={{textTransform:"uppercase"}}
                              value={editedName}
                              onChange={handleNameChange}
                            />
                            <input
                              type="text"
                              value={editedPrice}
                              onChange={handlePriceChange}
                            />
                          </>
                        ) : (
                          <>
                          {item.dish_name}
                            
                            <div className="left" >
                              <Typography
                                variant="h6"
                                sx={{
                                  paddingTop: "12px",
                                  color: "#3DB000",
                                  fontWeight: 600,
                                  
                                }}
                              >
                                ₹ {item.dish_price}
                              </Typography>
                            </div>
                            
                          </>
                        )}
                        
                        <div className="right" >
                          {editingItemId===item._id ? (
                            // Render save changes button when in edit mode
                            <button style={{marginTop:"10px",width:"100%"}} onClick={() => handleSaveChanges(item)}>
                              Save Changes
                            </button>
                          ) : (
                            <div style={{display:"flex",justifyContent:"end",marginBottom:"30px"}}>
                              
                                <IconButton size="small" sx={{marginRight:"4px",color:"#FF9800",backgroundColor:"#FBFBA5",height:"30px",width:"30px",borderRadius:"50px",}} onClick={() => handleEditButtonClick(item)}>
                                  <Edit />
                                </IconButton>
                            
                              
                                <IconButton size="small" sx={{color:"#E71800",backgroundColor:"#FF9494",height:"30px",width:"30px",borderRadius:"50px",marginRight:"4px"}} onClick={() => handleDelete(item)}>
                                  <DeleteIcon />
                                </IconButton>
                             
                            </div>
                          )}
                            
                        </div>

                      </CardContent>
                    </Card>
                  ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Menu;
