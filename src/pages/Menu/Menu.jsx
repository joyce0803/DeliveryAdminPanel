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

const Menu = () => {
  const { id } = useParams();
  const { name } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [groupedMenuItems, setGroupedMenuItems] = useState({});

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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
            type="text"
            width="200px"
            ml="20px"
            justifyContent="end"
            backgroundColor="white"
            borderRadius="10px"
          >
            <InputBase
              sx={{ ml: 2, flex: 1, color: "black" }}
              placeholder="Search"
            />
            <IconButton type="button" sx={{ p: 1, color: "grey" }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </div>
      </div>



      <div style={{ margin:"20px"}}>
       
        <Grid
          container
          mt="20px"
          p="20px"
          sx={{  color: "#F1F9B8" }}
        >
          {Object.keys(groupedMenuItems).map((type) => (
            <Grid items xs={12} md={6} lg={3} key={type}>
              <Typography sx={{fontWeight:600,fontSize:"18px"}} variant="h6" gutterBottom>
                {type}
              </Typography>
              <Grid container spacing={1} sx={{padding:"10px"}}>
                {groupedMenuItems[type].map((item) => (
                  <Card variant="outlined" sx={{width:250,height:80,backgroundColor:"#B5FFDD", color:"black", margin:"5px", fontWeight:"600",":hover": {
                    backgroundColor: "#003C3C",
                    color:"white",
                    border:"1px solid white"
                  }}} key={item._id}>
                    <CardContent>
                      {item.dish_name}
                      <div>
                  <Typography
                    variant="h6"
                    sx={{ paddingTop: "15px", color: "#0F8E04", fontWeight:600 }}
                  >
                    ₹ {item.dish_price}
                  </Typography>
                </div>
                      </CardContent>
                  </Card>
                ))}

                {/* <Grid item xs={12} md={6} lg={4} key={type}>
              <Card variant="outlined">
                <CardContent>
                <div key={type}>
              <h2>{type}</h2>
              
               
                  
                
              
            </div>
                </CardContent>
              </Card>
              

            </Grid> */}
              </Grid>
            </Grid>
          ))}

          {/* <Grid items xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            {types[0]}
          </Typography>
          <Grid container spacing={1}>
            {vegPizzas.map((item) => (
              <Grid item xs={12} key={item._id}>
                <Card variant="outlined" sx={{backgroundColor: "#F3FEA5",color:"black",margin:"5px"}}>
                  <CardContent>
                    <Typography>{item.dish_name}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid items xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            {types[1]}
          </Typography>
          <Grid container spacing={2}>
            {nonVegPizzas.map((item) => (
              <Grid item xs={12} key={item._id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography>{item.dish_name}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid> */}
        </Grid>
      </div>
    </div>
  );
};

export default Menu;
