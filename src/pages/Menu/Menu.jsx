import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import {
  InputBase,
  Box,
  IconButton,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { Edit} from "@mui/icons-material";

const Menu = () => {
  const { id } = useParams();
  const { name } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [groupedMenuItems, setGroupedMenuItems] = useState({});
  const [filteredMenu, setFilteredMenu] = useState([]);


  useEffect(() => {
    axios
      .get(`https://caalm.shop/menus/${id}`)
      .then((response) => {
        const items = response.data;
        setMenuItems(items);
        console.log(items);
        console.log(id);

        const newGroupedMenuItems = items.reduce((groupedItems, item) => {
          const { dish_type } = item;
          if (!groupedItems[dish_type]) {
            groupedItems[dish_type] = [item];
          } else {
            groupedItems[dish_type].push(item);
          }
          return groupedItems;
        }, {});

        console.log(newGroupedMenuItems);
        setGroupedMenuItems(newGroupedMenuItems); // update groupedMenuItems state
        setFilteredMenu(items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleSearch=(e)=>{
    const searchField=e.target.value.toLowerCase();
    const filteredItems=menuItems.filter(
      (item) => 
        item.dish_name.toLowerCase().includes(searchField)||
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
      newGroupedMenuItems[type] = filteredItems.filter((item) => item.dish_type === type);
    });
    setGroupedMenuItems(newGroupedMenuItems);
  };


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
          <Grid items xs={12} md={6} lg={3} key={type}>
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
                    height: 80,
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
                  <CardContent sx={{ paddingTop: "10px" }}>
                    {item.dish_name}
                    <div>
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
                    <div>
                    <IconButton size="small">
            <Edit />
          </IconButton>
                    </div>
                  </CardContent>
                </Card>
                ))
              }
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  </div>
);
};

export default Menu;
