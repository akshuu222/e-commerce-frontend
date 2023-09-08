import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const theme = useTheme();
  const { cartItems } = useSelector((state) => state.cart);
  let total;

  if (cartItems) {
    total = cartItems?.reduce(
      (acc, crr) => acc + crr?.quantity * crr?.price,
      0
    );
  }

  return (
    <>
      {cartItems?.length === 0 ? (
        <Stack
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          minHeight={"100vh"}
          gap={"0.5rem"}
        >
          <Typography variant={"h2"} color={"primary"} fontWeight={600}>
            Your Cart is Empty
          </Typography>
          <Link to={"/products"}>
            <Button variant={"contained"}>Shop Now</Button>
          </Link>
        </Stack>
      ) : (
        <Box
          maxWidth={"1300px"}
          padding={"0.5rem"}
          sx={{
            margin: { xs: "5rem auto 1rem auto", md: "7rem auto 2rem auto" },
          }}
        >
          <Typography
            variant="h2"
            fontWeight={600}
            sx={{ marginBottom: { xs: "1.5rem", md: "2rem" } }}
          >
            Shopping Cart
          </Typography>
          <Box
            sx={{
              display: { xs: "flex", md: "grid" },
              gridTemplateColumns: "1.8fr 1fr",
              gap: "2rem",
              flexDirection: "column",
            }}
          >
            <Stack
              width={"100%"}
              minHeight={"20vh"}
              sx={{ padding: { xs: "0.2rem", md: "1rem" } }}
              boxSizing={"border-box"}
            >
              {cartItems?.map((i, index) => (
                <CartItem product={i} key={index} />
              ))}
            </Stack>

            <Stack
              width={"100%"}
              maxHeight={"30vh"}
              border={"1px solid black"}
              borderRadius={"15px"}
              sx={{
                position: { xs: "none", md: "sticky" },
                padding: { xs: "0.5rem", md: "1rem" },
              }}
              boxSizing={"border-box"}
              top={"15%"}
            >
              <Stack alignItems={"flex-start"} gap={2}>
                <Typography
                  variant="h2"
                  color={theme.palette.primary.main}
                  fontWeight={600}
                >
                  Gross Total
                </Typography>
                <Stack
                  width={"100%"}
                  direction={"row"}
                  justifyContent={"space-between"}
                  py={1}
                >
                  <Typography color={"black"} variant="h4" fontWeight={600}>
                    Order total
                  </Typography>
                  <Typography color={"black"} variant="h6" fontWeight={600}>
                    ${total}
                  </Typography>
                </Stack>
                <Link to={"/shipping"} style={{ width: "100%" }}>
                  <Button fullWidth variant={"contained"}>
                    Checkout
                  </Button>
                </Link>
                <Typography textAlign={"center"}>
                  Learn more Taxes and Shipping infomation
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Cart;
