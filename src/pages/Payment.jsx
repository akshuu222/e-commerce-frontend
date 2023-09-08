import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CheckOutStep from "../components/CheckOutStep";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useSecretkeyMutation } from "../api/stripeapi";
import { removeAllProducts } from "../api/cart";
import { useNewOrderMutation } from "../api/order";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const payBtn = useRef();
  const [secret] = useSecretkeyMutation();
  const [orderApi] = useNewOrderMutation();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo?.subTotal,
    taxPrice: orderInfo?.tax,
    shippingPrice: orderInfo?.shippingCharges,
    totalPrice: orderInfo?.totalPrice,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
      };

      const data = await secret(paymentData).unwrap();
      const client_secret = data.client_secret;

      if (!stripe || !elements) {
        return;
      }
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: userInfo.name,
            email: userInfo.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          const res = await orderApi(order).unwrap();
          toast.success(res.message);
          dispatch(removeAllProducts());
          sessionStorage.removeItem("orderInfo")
          navigate("/ordersuccess")
        } else {
          toast.error("There is some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Box
      maxWidth={"1300px"}
      padding={"0.5rem"}
      p={2}
      sx={{
        margin: { xs: "4rem auto 1rem auto", md: "7rem auto 2rem auto" },
      }}
    >
      <CheckOutStep activeStep={2} />
      <Typography
        gutterBottom
        textAlign={"center"}
        fontWeight={600}
        color={"primary"}
        variant={"h2"}
        my={4}
      >
        Card Info
      </Typography>
      <Stack
        gap={3}
        maxWidth={"400px"}
        margin={"1rem auto 0 auto"}
        border={"1px solid black"}
        width={"100%"}
        p={2}
        borderRadius={"15px"}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Stack direction={"row"} alignItems={"center"} position={"relative"}>
          <CreditCardIcon sx={{ position: "absolute", left: "5%" }} />
          <CardNumberElement className="cardInput" />
        </Stack>
        <Stack direction={"row"} alignItems={"center"} position={"relative"}>
          <EventIcon sx={{ position: "absolute", left: "5%" }} />
          <CardExpiryElement className="cardInput" />
        </Stack>
        <Stack direction={"row"} alignItems={"center"} position={"relative"}>
          <VpnKeyIcon sx={{ position: "absolute", left: "5%" }} />
          <CardCvcElement className="cardInput" />
        </Stack>
        <Button variant="contained" ref={payBtn} type="submit">
          Pay - ${orderInfo && orderInfo.totalPrice}
        </Button>
      </Stack>
    </Box>
  );
};

export default Payment;
