import { Icon, Stack, Typography } from "@mui/material";
import React from "react";
import logo from "../images/online-shop.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import appStore from "../images/app-store.jpg";
import playStore from "../images/google-play.jpg";
import payment from "../images/payment-method.png";
import { Link, useLocation } from "react-router-dom";
import { LinkedIn } from "@mui/icons-material";
import { useSelector } from "react-redux";

export const icons = [
  { icon: <GitHubIcon />, link: "https://github.com/akshuu222" },
  {
    icon: <FacebookIcon />,
    link: "https://www.facebook.com/profile.php?id=100011368305815",
  },
  {
    icon: <LinkedIn />,
    link: "https://www.linkedin.com/in/akshath-lm-a29788259",
  },
];

const Footer = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const { userInfo } = useSelector((state) => state.user);

  const about = [
    { name: "About Us", link: "/about" },
    { name: "Delivery Information", link: userInfo ? "/myorders" : "/login" },
    { name: "Privacy Policy", link: "/about" },
    { name: "Terms & conditions", link: "/about" },
    { name: "Contact us", link: "/contact" },
    { name: "Support center", link: "/contact" },
  ];

  const account = [
    { name: "Sign In", link: userInfo ? "/" : "/login" },
    { name: "View Cart", link: "/cart" },
    { name: "Profile", link: userInfo ? "/profile " : "/login" },
    { name: "Track My Order", link: userInfo ? "/myorders" : "/login" },
    { name: "Help", link: "/contact" },
    { name: "Order", link: userInfo ? "/myorders" : "/login" },
  ];

  return (
    <>
      {!isAdminRoute && (
        <Stack
          sx={{
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: "2rem", md: "0rem" },
            alignItems: { xs: "flex-start", md: "stretch" },
            padding: "1.5rem",
            maxWidth: "1350px",
            margin: "1rem auto",
          }}
        >
          <Stack flex={1} alignItems={"flex-start"} gap={1.5}>
            <img
              src={logo}
              alt="logo"
              style={{ width: "60px", height: "60px", objectFit: "contain" }}
            />
            <Typography variant={"h3"}>Contact</Typography>
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <Typography fontWeight={500}>Address:</Typography>
              <Typography>
                562 Wellington Road, Street 32, San Francisco
              </Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <Typography fontWeight={500}>Phone:</Typography>
              <Typography>+01 2222 365 /(+91) 01 2345 6789</Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <Typography fontWeight={500}>Hours:</Typography>
              <Typography>10:00 - 18:00, Mon - Sat</Typography>
            </Stack>
            <Stack gap={2}>
              <Typography variant={"h3"}>Follow Us</Typography>
              <Stack direction={"row"} spacing={4}>
                {icons?.map((icon, index) => (
                  <a href={icon.link} key={index}>
                    <Icon sx={{ cursor: "pointer" }}>{icon.icon}</Icon>
                  </a>
                ))}
              </Stack>
            </Stack>
          </Stack>

          <Stack
            flex={1}
            direction={"row"}
            spacing={5}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Stack alignItems={"flex-start"} gap={2}>
              <Typography variant="h3" fontWeight={700}>
                About
              </Typography>
              {about.map((a, index) => (
                <Link to={a.link}>
                  <Typography
                    key={index}
                    variant={"body1"}
                    sx={{ cursor: "pointer" }}
                  >
                    {a.name}
                  </Typography>
                </Link>
              ))}
            </Stack>
            <Stack alignItems={"flex-start"} gap={2}>
              <Typography variant="h3" fontWeight={700}>
                My Account
              </Typography>
              {account.map((a, index) => (
                <Link to={a.link}>
                  <Typography
                    key={index}
                    variant={"body1"}
                    sx={{ cursor: "pointer" }}
                  >
                    {a.name}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Stack>

          <Stack
            flex={1}
            gap={2.9}
            alignItems={"flex-start"}
            justifyContent={"center"}
          >
            <Typography variant="h3" fontWeight={700}>
              Install App
            </Typography>
            <Typography variant="h4">From App Store or Google Play</Typography>
            <Stack
              sx={{
                flexDirection: { xs: "column", md: "row" },
                alignSelf: { xs: "center", md: "flex-start" },
                gap: { xs: "1rem", md: "0" },
              }}
              alignItems={"center"}
            >
              <img src={playStore} alt="playStore" />
              <img src={appStore} alt="appStore" />
            </Stack>
            <Typography variant="h4">Secured Payment Gateways</Typography>
            <Stack>
              <img src={payment} alt="payment" />
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Footer;
