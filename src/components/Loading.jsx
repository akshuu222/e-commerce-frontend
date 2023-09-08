import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Box
      height={"90vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      mt={7}
    >
      <CircularProgress color={"primary"} />
    </Box>
  );
};

export default Loading;
