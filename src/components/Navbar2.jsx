import { AppBar, Link, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../api/userSlice";
import { useLoginMutation } from "../api/userapi";
import { toast } from "react-toastify";

const Navbar2 = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const [logoutapi] = useLoginMutation();
  const handleLogout = async () => {
    try {
      const res = await logoutapi();
      dispatch(logout());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <>
      {!isAdminRoute && (
        <AppBar
          position="sticky"
          sx={{ top: "0%", display: { xs: "none", sm: "block" }, px: 15 }}
        >
          <Toolbar sx={{ display: "flex", alignContent: "center" }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={4}
              sx={{ display: { xs: "none", sm: "flex" } }}
              flex={"1"}
              justifyContent={"center"}
            >
              <RouterLink to={"/"}>
                <Typography variant="h5" sx={{ cursor: "pointer" }}>
                  Home
                </Typography>
              </RouterLink>
              <RouterLink to={"/about"}>
                <Typography variant="h5" sx={{ cursor: "pointer" }}>
                  About
                </Typography>
              </RouterLink>
              <RouterLink to={"/products"}>
                <Typography variant="h5" sx={{ cursor: "pointer" }}>
                  Shop
                </Typography>
              </RouterLink>
              <RouterLink to={"/contact"}>
                <Typography variant="h5" sx={{ cursor: "pointer" }}>
                  Contact
                </Typography>
              </RouterLink>
              <RouterLink to={"/profile"}>
                <Typography variant="h5" sx={{ cursor: "pointer" }}>
                  Account
                </Typography>
              </RouterLink>
              {userInfo?.role === "admin" && (
                <RouterLink to={"/admin/dashboard"}>
                  <Typography variant="h5" sx={{ cursor: "pointer" }}>
                    Dashboard
                  </Typography>
                </RouterLink>
              )}
            </Stack>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              {userInfo ? (
                <Link
                  sx={{
                    color: "white",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              ) : (
                <RouterLink
                  style={{
                    color: "white",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  to={"/login"}
                >
                  sign / signup
                </RouterLink>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default Navbar2;
