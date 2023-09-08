import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../api/userapi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../api/userSlice";

const list = [
  { name: "Account Details", logo: <PersonIcon />, to: "/profile" },
  { name: "Orders", logo: <ShoppingBasketIcon />, to: "/myorders" },
  { name: "Edit Password", logo: <EditIcon />, to: "/changepassword" },
];

const DashBoard = () => {
  const [logoutapi] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logoutapi().unwrap();
      toast.success(res.message);
      navigate("/");
      dispatch(logout());
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <Stack
      width={"100%"}
      border={"1px solid black"}
      borderRadius={"10px"}
      sx={{ xs: "1rem", md: "2rem" }}
      flex={0.25}
      maxHeight={"40vh"}
    >
      <List disablePadding>
        {list.map((l, index) => (
          <Link to={l.to} key={index}>
            <ListItem key={index} button>
              <ListItemIcon>{l.logo}</ListItemIcon>
              <ListItemText
                primary={<Typography variant="subtitle1">{l.name}</Typography>}
              />
            </ListItem>
          </Link>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="subtitle1">Logout</Typography>}
          />
        </ListItem>
      </List>
    </Stack>
  );
};

export default DashBoard;
