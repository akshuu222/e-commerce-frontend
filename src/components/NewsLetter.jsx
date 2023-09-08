import { Icon, Stack, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import MailIcon from "@mui/icons-material/Mail";

const NewsLetter = () => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      bgcolor={theme.palette.secondary.main}
      color={"black"}
      justifyContent={"space-between"}
      sx={{
        padding: "1rem 2rem",
        flexDirection: { xs: "column", md: "row" },
        gap: "2rem",
      }}
      border={"1px solid grey"}
      borderRadius={"15px"}
      mt={5}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Icon>
          <MailIcon />
        </Icon>
        <Typography variant="h4">Sign up to Newsletter</Typography>
      </Stack>
      <Stack sx={{ display: { xs: "none", md: "block" } }}>
        <Typography variant="h4">
          ...and receive $25 coupon for first shopping.
        </Typography>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <TextField placeholder="Enter your email" />
        <button
          style={{
            backgroundColor: "black",
            border: "none",
            outline: "none",
            cursor: "pointer",
            color: "white",
            padding: "0.9rem 1.3rem",
          }}
        >
          <Typography variant="h5">Subscribe</Typography>
        </button>
      </Stack>
    </Stack>
  );
};

export default NewsLetter;
