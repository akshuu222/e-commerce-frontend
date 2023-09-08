import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  useTheme,
  Stack,
  IconButton,
  Typography,
  Icon,
  Badge,
} from "@mui/material";
import logo from "../images/online-shop.png";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Menus from "./Menus";
import SideBar from "./SideBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../api/searchSlice";

const Navbar = () => {
  const theme = useTheme();
  const { cartItems } = useSelector((state) => state.cart);
  const { search, category } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [side, setSide] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e, v, cat) => {
    setAnchorEl(null);
  };

  const handleSearchClick = () => {
    navigate("/products");
  };

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && (
        <>
          <AppBar
            sx={{
              backgroundColor: theme.palette.secondary.main,
              boxShadow: 0,
              borderBottom: `2px solid ${theme.palette.primary.main}`,
              position: "absolute",
              top: { xs: "0", md: "7.6%" },
            }}
          >
            <Toolbar sx={{ display: "flex", alignItems: "center" }}>
              <Stack flex={0.5}>
                <Link to={"/"} >
                  <img
                    style={{ width: "2rem", height: "2rem" }}
                    src={logo}
                    alt="logo"
                  />
                </Link>
              </Stack>
              <Stack
                flexDirection={"row"}
                sx={{
                  flex: 2,
                  alignItems: "center",
                  gap: "1rem",
                  display: { xs: "none", sm: "flex" },
                }}
              >
                <Stack
                  flexDirection={"row"}
                  onClick={(e) => handleClick(e)}
                  sx={{ alignItems: "center", cursor: "pointer" }}
                >
                  <Typography color={"black"}>
                    {category === "" ? "All categories" : category}
                  </Typography>
                  <Icon sx={{ color: "black" }}>
                    <ArrowDropDownIcon />
                  </Icon>
                </Stack>
                <Stack
                  flex={"2"}
                  direction={"row-reverse"}
                  gap={2}
                  alignItems={"center"}
                >
                  <IconButton
                    onClick={handleSearchClick}
                    sx={{ color: "black", cursor: "pointer" }}
                  >
                    <SearchIcon sx={{ fontSize: "1.5rem" }} />
                  </IconButton>
                  <input
                    placeholder="Search For Items"
                    type="text"
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                    style={{
                      border: "none",
                      background: "transparent",
                      outline: "none",
                      height: "2rem",
                      borderBottom: "2px solid black",
                    }}
                  />
                </Stack>
              </Stack>
              <Stack
                width={"100%"}
                direction={"row"}
                alignItems={"center"}
                flex={1}
                sx={{
                  gap: { xs: "0.5rem", sm: "1rem" },
                  justifyContent: { xs: "flex-end", sm: "center" },
                }}
              >
                <Link to={"/cart"}>
                  <IconButton>
                    <Badge badgeContent={cartItems?.length} color={"success"}>
                      <ShoppingBagIcon />
                    </Badge>
                  </IconButton>
                </Link>
                <IconButton
                  sx={{
                    display: { xs: "flex", sm: "none" },
                  }}
                  onClick={() => setSide(true)}
                >
                  <MenuIcon
                    sx={{
                      fontSize: "1.5rem",
                    }}
                  />
                </IconButton>
              </Stack>
            </Toolbar>
          </AppBar>

          <SideBar side={side} setSide={setSide} />
          <Menus anchorEl={anchorEl} handleClose={handleClose} />
        </>
      )}
    </>
  );
};

export default Navbar;
