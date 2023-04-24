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

  useEffect(() => {
    axios
      .get(`https://caalm.shop/menus/${id}`)
      .then((response) => {
        setMenuItems(response.data);
        console.log(response.data);
        console.log(id);
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

      <Grid
        container
        spacing={4}
        className="cards"
        justifyContent="space-between"
        ml="10px"
        mt="20px"
      >
        {menuItems.map((items, index) => (
          <Grid items xs={12} sm={6} md={4} lg={3} key={items._id}>
            <Card
              variant="outlined"
              className="menuData"
              sx={{
                maxWidth: 300,
                height: 90,
                margin: "10px", 
                backgroundColor: "#0F1E1E",
                borderRadius: "10px",
                WebkitBoxShadow: "3px 3px 5px 4px rgba(9,92,92,0.39)",
                boxShadow: "3px 3px 5px 4px rgba(9,92,92,0.19)",
                MozBoxShadow: "3px 3px 5px 4px rgba(9,92,92,0.39)",
                ':hover':{
                  backgroundColor:"#003C3C"
                }
              }}
            >
              <CardContent sx={{overflow:"auto"}}>
                
                <Typography sx={{fontSize:"14px"}}>{items.dish_name}</Typography>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                  <div>
                  <Typography
                  variant="h6"
                  sx={{ paddingTop: "15px", color: "#92FF76" , }}
                >
                  ₹ {items.dish_price}
                </Typography>
                  </div>
                  <div style={{
                    justifyContent: "flex-end",
                    display: "flex",
                  }}>
                    <Typography sx={{fontSize:"10px",paddingTop: "20px",color:"#F0FF76"}}>{items.dish_type}</Typography>
                  </div>
                </div>
                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Menu;
