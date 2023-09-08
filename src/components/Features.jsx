import { Card, CardContent, CardMedia, Stack, useTheme } from "@mui/material";
import React from "react";
import { features } from "../utils/features";

const Features = () => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      flexWrap={"wrap"}
      width={"100%"}
      margin={"3rem auto 2rem auto"}
      rowGap={3}
      columnGap={2}
    >
      {features.map((feature, index) => (
        <Card
          key={index}
          sx={{
            padding: "0.5rem",
            border: `1px solid ${theme.palette.primary.main}`,
            bgcolor:theme.palette.secondary.main
          }}
        >
          <CardMedia
            component={"img"}
            alt={feature.title}
            image={feature.image}
            style={{objectFit:"cover"}}
          />
          <CardContent sx={{display:"flex" , alignItems:"center" , justifyContent:"center"}} >{feature.title}</CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default Features;
