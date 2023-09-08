import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckOutStep from "../components/CheckOutStep";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const address = `${shippingInfo.address} ${shippingInfo.city} ${shippingInfo.state} ${shippingInfo.country} ${shippingInfo.pinCode}`;

  const subTotal = cartItems.reduce(
    (acc, crr) => acc + crr.quantity * crr.price,
    0
  );
  const shippingCharges = subTotal > 1500 ? 0 : 150;
  const tax = subTotal * 0.18;
  const totalPrice = subTotal + shippingCharges + tax;

  const handlePayment = () => {
    const data = {
      subTotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  const theme = useTheme();

  return (
    <Stack
      maxWidth={"1300px"}
      padding={"0.5rem"}
      p={2}
      sx={{
        margin: { xs: "4rem auto 1rem auto", md: "5rem auto 2rem auto" },
      }}
    >
      <CheckOutStep activeStep={1} />
      <OuterContainer
        sx={{
          display: { xs: "flex", lg: "grid" },
          border: "1px solid black",
          flexDirection: { xs: "column", lg: "none" },
        }}
      >
        <Stack p={1} spacing={5}>
          <Stack width={"100%"}>
            <Typography
              gutterBottom
              variant="h4"
              fontWeight={600}
              color={"primary"}
            >
              Shipping Info
            </Typography>
            <Stack pl={0}>
              <Stack
                width={"100%"}
                direction={"row"}
                spacing={2}
                alignItems={"center"}
              >
                <Typography variant={"subtitle1"}>Name :</Typography>
                <Typography
                  fontWeight={"600"}
                  color={"primary"}
                  variant="subtitle1"
                >
                  {userInfo?.name?.toUpperCase()}
                </Typography>
              </Stack>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Typography variant="subtitle1">Phone :</Typography>
                <Typography
                  fontWeight={"600"}
                  color={"primary"}
                  variant="subtitle1"
                >
                  {shippingInfo?.phoneNo}
                </Typography>
              </Stack>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Typography variant="subtitle1">Address :</Typography>
                <Typography
                  fontWeight={"600"}
                  color={"primary"}
                  variant="subtitle1"
                >
                  {address}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack>
            <Typography
              gutterBottom
              fontWeight={600}
              variant="h4"
              color={"primary"}
            >
              Your Cart Items
            </Typography>
            <Stack spacing={2} p={2} justifyContent={"center"}>
              {cartItems.map((item, index) => (
                <Stack
                  key={index}
                  sx={{ flexDirection: { xs: "column", lg: "row" } }}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  spacing={1}
                >
                  <Stack
                    sx={{ flexDirection: { xs: "column", lg: "row" } }}
                    alignItems={"center"}
                    flex={2}
                    justifyContent={"space-between"}
                    spacing={2}
                  >
                    <img
                      src={item?.image?.url}
                      alt="shoes"
                      style={{
                        width: "300px",
                        height: "200px",
                        objectFit: "contain",
                        border: `1px solid ${theme.palette.primary.main}`,
                        borderRadius: "15px",
                      }}
                    />
                    <Typography variant="h5" color={"primary"} fontWeight={600}>
                      {item.name}
                    </Typography>
                  </Stack>
                  <Stack flex={1} alignItems={"flex-end"}>
                    <Typography
                      variant={"subtitle1"}
                      color={"primary"}
                      fontWeight={600}
                    >
                      {item.quantity}X{item.price} = $
                      {item.quantity * item.price}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>

        {/* 2nd */}
        <Stack
          pt={2}
          alignItems={"center"}
          borderLeft={"2px solid black"}
          sx={{
            position: { xs: "static", md: "sticky" },
            borderTop: { xs: "2px solid black", md: "none" },
            borderLeft: { xs: "none", md: "2px solid black" },
          }}
          top={"13%"}
          maxHeight={"370px"}
        >
          <Typography mb={2} variant="h4" fontWeight={600} color={"primary"}>
            Order Summary
          </Typography>
          <Stack
            py={3}
            borderBottom={"1px solid gray"}
            borderTop={"1px solid black"}
            width={"70%"}
            spacing={3}
          >
            <Stack
              width={"100%"}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant={"h5"} fontWeight={500}>
                SubTotal :
              </Typography>
              <Typography variant="h5" fontWeight={700} color={"primary"}>
                $ {subTotal}
              </Typography>
            </Stack>
            <Stack
              width={"100%"}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant={"h5"} fontWeight={500}>
                Shipping Charges :
              </Typography>
              <Typography variant="h5" fontWeight={700} color={"primary"}>
                $ {shippingCharges}
              </Typography>
            </Stack>
            <Stack
              width={"100%"}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant={"h5"} fontWeight={500}>
                GST :
              </Typography>
              <Typography variant="h5" fontWeight={700} color={"primary"}>
                $ {tax}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            width={"70%"}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mt={3}
            mb={5}
          >
            <Typography variant={"h4"} fontWeight={500} color={"primary"}>
              Total
            </Typography>
            <Typography variant="h5" fontWeight={700} color={"primary"}>
              $ {totalPrice}
            </Typography>
          </Stack>
          <Button onClick={handlePayment} variant="contained" color="primary">
            Proceed To Payment
          </Button>
        </Stack>
      </OuterContainer>
    </Stack>
  );
};

const OuterContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: "1rem",
  margin: "1rem 0",
  display: "grid",
  gridTemplateColumns: "6fr 3fr",
  gap: "1rem",
}));

export default ConfirmOrder;
