import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

const CommentsCard = () => {
  return (
    <Stack p={2} border={"1px solid black"} borderRadius={"15px"} maxWidth={"300px"} >
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <Avatar>A</Avatar>
        <Typography>Akshath</Typography>
      </Stack>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, ipsa
        excepturi odit deleniti velit nostrum mollitia molestias maiores
        asperiores incidunt!
      </Typography>
    </Stack>
  );
};

export default CommentsCard;
