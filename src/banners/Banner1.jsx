import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const Banner1 = ({ banner }) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      width={"100%"}
      height={"100%"}
      sx={{ flexDirection: { xs: "column", md: "row" } }}
    >
      <Stack
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        height={"100%"}
      >
        <Stack sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography
            fontWeight={300}
            sx={{ fontSize: { xs: "6vw", md: "2.5vw" } }}
          >
            {banner.first}
          </Typography>
          <Typography
            fontWeight={500}
            lineHeight={"1"}
            sx={{ fontSize: { xs: "10vw", md: "3.8vw" } }}
          >
            {banner.middle}
          </Typography>
          <Typography
            fontWeight={600}
            sx={{
              fontSize: { xs: "14vw", md: "5.2vw" },
              lineHeight: "1",
              color: banner.color,
            }}
          >
            {banner.last}
          </Typography>
          <Typography variant="subtitle1" fontWeight={500} mt={2}>
            {banner.subtitle}
          </Typography>
        </Stack>
      </Stack>
      <Stack flex={1} width={"100%"} height={"100%"}>
        <img
          src={banner.image}
          alt="banner"
          style={{ width: "100%", objectFit: "cover", height: "100%" }}
        />
      </Stack>
    </Box>
  );
};

export default Banner1;
