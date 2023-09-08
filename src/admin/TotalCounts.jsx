import React from "react";
import { Icon, Stack, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link } from "react-router-dom";

const TotalCounts = ({ products, orders, users, earned }) => {
  return (
    <Stack
      mt={2}
      direction={"row"}
      flexWrap={"wrap"}
      sx={{ justifyContent: "center", gap: "3rem", alignItems: "center" }}
    >
      <Link to={"/admin/products"}>
        <Stack
          border={"1px solid black"}
          borderRadius={"20px"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={2}
          gap={1.5}
          width={"250px"}
          height={"130px"}
          bgcolor={"greenyellow"}
        >
          <Stack gap={"0.5rem"}>
            <Typography variant="h3">{products}</Typography>
            <Typography variant="h3">Products</Typography>
          </Stack>
          <Stack>
            <Icon sx={{ fontSize: "4rem" }}>
              <ShoppingCartIcon sx={{ fontSize: "4rem" }} />
            </Icon>
          </Stack>
        </Stack>
      </Link>
      <Link to={"/admin/orders"}>
        <Stack
          border={"1px solid black"}
          borderRadius={"20px"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={2}
          gap={1.5}
          width={"250px"}
          height={"130px"}
          bgcolor={"paleturquoise"}
        >
          <Stack gap={"0.5rem"}>
            <Typography variant="h3">{orders}</Typography>
            <Typography variant="h3">Orders</Typography>
          </Stack>
          <Stack>
            <Icon sx={{ fontSize: "4rem" }}>
              <EditIcon sx={{ fontSize: "4rem" }} />
            </Icon>
          </Stack>
        </Stack>
      </Link>
      <Link to={"/admin/users"}>
        <Stack
          border={"1px solid black"}
          borderRadius={"20px"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={2}
          gap={1.5}
          width={"250px"}
          height={"130px"}
          bgcolor={"steelblue"}
        >
          <Stack gap={"0.5rem"}>
            <Typography variant="h3">{users}</Typography>
            <Typography variant="h3">Our Users</Typography>
          </Stack>
          <Stack>
            <Icon sx={{ fontSize: "4rem" }}>
              <PersonIcon sx={{ fontSize: "4rem" }} />
            </Icon>
          </Stack>
        </Stack>
      </Link>
      <Stack
        border={"1px solid black"}
        borderRadius={"20px"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={2}
        gap={1.5}
        width={"250px"}
        height={"130px"}
        bgcolor={"orangered"}
      >
        <Stack gap={"0.5rem"}>
          <Typography variant="subtitle1">{earned}</Typography>
          <Typography variant="h3">Total Earned</Typography>
        </Stack>
        <Stack>
          <Icon sx={{ fontSize: "4rem" }}>
            <AttachMoneyIcon sx={{ fontSize: "4rem" }} />
          </Icon>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TotalCounts;
