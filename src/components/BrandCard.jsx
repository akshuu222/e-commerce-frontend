import { Card, CardMedia } from "@mui/material";
import React from "react";

const BrandCard = ({ brand }) => {
  return (
    <Card elevation={0} sx={{display:"flex" , alignItems:"center" , justifyContent:"center"}} >
      <CardMedia
        component={"img"}
        src={brand.image}
        alt="image"
        sx={{
          objectFit: "contain",
          width: { xs: "70px", md: "150px" },
          height: { xs: "70px", md: "150px" },
        }}
      />
    </Card>
  );
};

export default BrandCard;
