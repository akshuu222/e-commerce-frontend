import {
  Button,
  Collapse,
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import logo from "../images/online-shop.png";
import CloseIcon from "@mui/icons-material/Close";
import GridViewIcon from "@mui/icons-material/GridView";
import { categories } from "../utils/categories";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import BookIcon from "@mui/icons-material/Book";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../api/userapi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../api/userSlice";
import { setCategory, setSearch } from "../api/searchSlice";
import SearchIcon from "@mui/icons-material/Search";

const SideBar = ({ side, setSide }) => {
  const drawerWidth = 270;
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const [dropDown, setDropDown] = useState(false);
  const [search, setSearchs] = useState("");

  const [logoutapi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await logoutapi().unwrap();
      setSide(false);
      toast.success(res.message);
      dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const handleClick = (cat) => {
    setSide(false);
    dispatch(setCategory(cat?.name === "All categories" ? "" : cat?.name));
    navigate("/products");
  };

  const handleSearch = () => {
    setSide(false);
    dispatch(setSearch(search));
    navigate("/products");
    setSearch("");
  };

  return (
    <Drawer
      open={side}
      anchor={"right"}
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          color: "white",
          backgroundColor: theme.palette.secondary.main,
          boxSizing: "border-box",
          width: drawerWidth,
          padding: "0 0.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 5,
        },
      }}
    >
      <List>
        <ListItem
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "2rem", height: "2rem" }}
          />
          <IconButton size="medium" onClick={() => setSide(false)}>
            <CloseIcon />
          </IconButton>
        </ListItem>
        <Divider />
        <Stack direction={"row"} alignItems={"center"} mt={2.5} gap={0.5}>
          <TextField
            value={search}
            onChange={(e) => setSearchs(e.target.value)}
            placeholder="Search for items..."
            size="small"
          />
          <Icon
            sx={{ color: "black", fontSize: "1.5rem" }}
            onClick={handleSearch}
          >
            <SearchIcon sx={{ color: "black", fontSize: "1.5rem" }} />
          </Icon>
        </Stack>
        <ListItem
          button
          sx={{ marginTop: "1.5rem" }}
          onClick={() => setDropDown((prev) => !prev)}
        >
          <ListItemIcon>
            <GridViewIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant={"h4"}
                fontWeight={400}
                color={theme.palette.primary.main}
              >
                Categories
              </Typography>
            }
          />
          <ListItemIcon>
            <ArrowDropDownIcon />
          </ListItemIcon>
        </ListItem>
        <Collapse in={dropDown}>
          <List disablePadding sx={{ paddingLeft: "2rem" }}>
            {categories.map((cat, index) => (
              <ListItem button key={index} onClick={() => handleClick(cat)}>
                <ListItemIcon color={"black"}>{cat.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography color={theme.palette.primary.main}>
                      {cat.name}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <Link to={"/products"} onClick={() => setSide(false)}>
          <ListItem>
            <ListItemIcon>
              <FiberNewIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant={"h4"}
                  fontWeight={400}
                  color={theme.palette.primary.main}
                >
                  New Arivals
                </Typography>
              }
            />
          </ListItem>
        </Link>
        <Link to={"/about"} onClick={() => setSide(false)}>
          <ListItem>
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant={"h4"}
                  fontWeight={400}
                  color={theme.palette.primary.main}
                >
                  About us
                </Typography>
              }
            />
          </ListItem>
        </Link>
        {userInfo?.role === "admin" && (
          <Link to={"/admin/dashboard"} onClick={() => setSide(false)}>
            <ListItem>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant={"h4"}
                    fontWeight={400}
                    color={theme.palette.primary.main}
                  >
                    Dashboard
                  </Typography>
                }
              />
            </ListItem>
          </Link>
        )}
        <Link to={"/contact"} onClick={() => setSide(false)}>
          <ListItem>
            <ListItemIcon>
              <ContactPhoneIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant={"h4"}
                  fontWeight={400}
                  color={theme.palette.primary.main}
                >
                  Contact us
                </Typography>
              }
            />
          </ListItem>
        </Link>
        {userInfo && (
          <Link to={"/profile"} onClick={() => setSide(false)}>
            <ListItem>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant={"h4"}
                    fontWeight={400}
                    color={theme.palette.primary.main}
                  >
                    Account
                  </Typography>
                }
              />
            </ListItem>
          </Link>
        )}
        {userInfo && (
          <Link to={"/myorders"} onClick={() => setSide(false)}>
            <ListItem>
              <ListItemIcon>
                <ViewStreamIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant={"h4"}
                    fontWeight={400}
                    color={theme.palette.primary.main}
                  >
                    Your Orders
                  </Typography>
                }
              />
            </ListItem>
          </Link>
        )}
      </List>

      {userInfo ? (
        <Button onClick={handleLogout} size={"large"} variant={"outlined"}>
          Log out
        </Button>
      ) : (
        <Button
          onClick={() => {
            setSide(false);
            navigate("/login");
          }}
          size={"large"}
          variant={"outlined"}
        >
          Log In
        </Button>
      )}
    </Drawer>
  );
};

export default SideBar;
