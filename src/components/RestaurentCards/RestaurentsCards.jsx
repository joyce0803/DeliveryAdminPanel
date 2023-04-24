import { useEffect, useState } from "react";
import axios from "axios";

import { Link } from 'react-router-dom';

import {
  Card,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";

const RestaurentsCards = () => {
  const [details, setDetails] = useState([]);
  
  

  useEffect(() => {
    axios
      .get("https://caalm.shop/restaurents")
      .then((response) => {
        setDetails(response.data);
        console.log(details);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [details]);

  return (
    <div>
      <Grid
        container
        spacing={4}
        className="cards"
        justifyContent="space-between"
        ml="10px"
        mt="20px"
      >  
        {details.map((detail, index) => (
          <Grid item xs={12} sm={6} md={3} key={detail._id}>
            <Card variant="outlined" className="card" sx={{ maxWidth: 250, position: "relative" ,':hover':{
                  backgroundColor:"white"
                } }}>
                
              <Box sx={{ position: "relative" }}>
              <Link to={`/menus/${detail.rest_name}/${detail.rest_id}`} style={{textDecoration:"none"}}  >
                
                  <CardMedia
                    component="img"
                    height="200"
                    image={detail.rest_image}
                    alt="green iguana"
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      bgcolor: "rgba(0, 0, 0, 0.70)",
                      color: "white",
                      padding: "10px",
                      alignItems:'center',
                      textAlign:'center',
                    }}
                  >
                    <Typography variant="h5">{detail.rest_name}</Typography>
                  </Box>
                
                </Link>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RestaurentsCards;
