import React from "react";
import { Stack, Typography, IconButton, Icon } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";

const AdminMenu = ({ setOpen, title, subtitle }) => {
  return (
    <Stack spacing={0.5}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <IconButton
            sx={{ display: { xs: "none", md: "block" } }}
            onClick={() => setOpen((prev) => !prev)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h2"
            fontWeight={600}
            letterSpacing={1.2}
            gutterBottom
          >
            {title}
          </Typography>
        </Stack>

        <Stack>
          <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
            <Typography variant={"h6"} color={"primary"} fontWeight={600}>
              Back To Home
            </Typography>
            <Icon sx={{ fontSize: { xs: "1.5rem", md: "3rem" } }}>
              <ArrowRightAltIcon
                sx={{ fontSize: { xs: "1.5rem", md: "3rem" } }}
              />
            </Icon>
          </Link>
        </Stack>
      </Stack>
      <Stack>
        <Typography
          pl={"3.5vw"}
          variant={"body1"}
          letterSpacing={1.2}
          color={"grey"}
        >
          {subtitle}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AdminMenu;
