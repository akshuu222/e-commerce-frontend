import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Drawer,
  Stack,
  Divider,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import profile from "../images/userImage.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminSidebar = ({ open }) => {
  const { userInfo } = useSelector((state) => state.user);

  const drawerWidth = 250;
  const theme = useTheme();
  const [collapse, setCollapse] = useState(false);

  return (
    <>
      <ResponsiveDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-root": {
            display: { xs: "none", md: "block" },
          },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Stack pt={3} spacing={2}>
          <Stack direction={"row"} justifyContent={"space-around"}>
            <Typography variant="h2" textAlign={"center"}>
              Ecommerce
            </Typography>
          </Stack>
          <Divider />
          <Stack alignItems={"center"}>
            <img
              src={userInfo?.avatar?.url ? userInfo?.avatar?.url : profile}
              alt="profile"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
                borderRadius: "50%",
                border: `1px solid ${theme.palette.primary.main}`,
                marginBottom: "0.5rem",
              }}
            />
            <Typography gutterBottom>{userInfo?.name}</Typography>
            <Typography>{userInfo?.email}</Typography>
          </Stack>
        </Stack>
        <List>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h3" fontWeight={600}>
              Dashboard
            </Typography>
          </ListItem>

          <Link to={"/admin/users"}>
            <ListItem button>
              <ListItemText>users</ListItemText>
            </ListItem>
          </Link>

          <ListItem button onClick={() => setCollapse((prev) => !prev)}>
            <ListItemText>Products</ListItemText>
            <ListItemIcon>
              <ArrowDropDownIcon />
            </ListItemIcon>
          </ListItem>

          <Collapse in={collapse}>
            <List disablePadding sx={{ paddingLeft: "2rem" }}>
              <Link to={"/admin/products"}>
                <ListItem button onClick={() => setCollapse(false)}>
                  <ListItemText>All Products</ListItemText>
                </ListItem>
              </Link>

              <Link to={"/admin/addproduct"}>
                <ListItem button onClick={() => setCollapse(false)}>
                  <ListItemText>Add Product</ListItemText>
                </ListItem>
              </Link>
            </List>
          </Collapse>

          <Link to={"/admin/orders"}>
            <ListItem button>
              <ListItemText>Orders</ListItemText>
            </ListItem>
          </Link>
        </List>
      </ResponsiveDrawer>
    </>
  );
};

const ResponsiveDrawer = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export default AdminSidebar;
