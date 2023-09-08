import React from "react";
import {
  Rating,
  Stack,
  Typography,
  IconButton,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addtocart, removeItem } from "../api/cart";
import { useDispatch } from "react-redux";

const CartItem = ({ product }) => {
  const theme = useTheme();
  const ismd = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  const increaseCount = () => {
    const newQty = product?.quantity + 1;
    if (newQty > product?.stock) return;
    dispatch(addtocart({ product, quantity: newQty }));
  };
  const decreaseCount = () => {
    const newQty = product?.quantity - 1;
    if (newQty <= 0) return;
    dispatch(addtocart({ product, quantity: newQty }));
  };

  return (
    <Stack
      direction={"row"}
      sx={{
        padding: { xs: "0.5rem", md: "1rem" },
        gap: { xs: "0.5rem", md: "1rem" },
      }}
      justifyContent={"space-between"}
      minHeight={"20vh"}
      borderBottom={"1px solid #d3d3d3"}
    >
      <Stack flex={4}>
        <img
          src={product?.image?.url}
          alt="product"
          style={{
            width: "100%",
            height: ismd ? "9rem" : "15rem",
            objectFit: "contain",
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: "20px",
          }}
        />
      </Stack>

      <Stack justifyContent={"space-between"} flex={3}>
        <Stack sx={{ gap: "0.5rem" }} alignItems={"flex-start"}>
          <Typography
            fontWeight={600}
            sx={{ fontSize: { xs: "1rem", md: "2rem" } }}
          >
            {product?.name.substring(0, 12)}
          </Typography>
          <Rating
            sx={{ fontSize: { xs: "1rem", md: "2rem" } }}
            readOnly
            value={product?.ratings}
          />
          <Typography variant={"h5"} fontWeight={600} color={"primary"}>
            ${product?.price}
          </Typography>
          <Stack
            width={"75px"}
            direction={"row"}
            alignItems={"center"}
            border={"1px solid black"}
            borderRadius={"40px"}
            justifyContent={"space-between"}
            bgcolor={"#F5F8FB"}
            padding={"0.2rem"}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <IconButton
              sx={{
                border: `1px solid ${theme.palette.primary.main}`,
                height: "20px",
                width: "20px",
              }}
              onClick={decreaseCount}
            >
              <RemoveIcon />
            </IconButton>
            <input
              value={product?.quantity}
              readOnly
              style={{
                width: "100%",
                height: "100%",
                border: "0",
                outline: "0",
                flex: 1,
                padding: "0.3rem 0.4rem",
                boxSizing: "border-box",
                background: theme.palette.secondary.main,
                textAlign: "center",
              }}
            />
            <IconButton
              sx={{
                border: `1px solid ${theme.palette.primary.main}`,
                height: "20px",
                width: "20px",
              }}
              onClick={increaseCount}
            >
              <AddIcon />
            </IconButton>
          </Stack>
        </Stack>
        {product?.stock >= 1 ? (
          <Typography color={"green"}>inStocks</Typography>
        ) : (
          <Typography color={"red"}>out Of stock</Typography>
        )}
      </Stack>

      <Stack>
        <Stack
          width={"115px"}
          direction={"row"}
          alignItems={"center"}
          border={"1px solid black"}
          borderRadius={"40px"}
          justifyContent={"space-between"}
          bgcolor={"#F5F8FB"}
          padding={"0.3rem"}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <IconButton
            size={"medium"}
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
            }}
            onClick={decreaseCount}
          >
            <RemoveIcon />
          </IconButton>
          <input
            type="text"
            value={product?.quantity}
            readOnly
            style={{
              width: "100%",
              height: "100%",
              border: "0",
              outline: "0",
              flex: 1,
              padding: "0.3rem 0.4rem",
              boxSizing: "border-box",
              background: theme.palette.secondary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <IconButton
            size={"medium"}
            sx={{
              border: `1px solid ${theme.palette.primary.main}`,
            }}
            onClick={increaseCount}
          >
            <AddIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ width: { xs: "60px", md: "100px" } }}
      >
        <Typography
          sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
          color={theme.palette.primary.main}
          fontWeight={600}
        >
          ${product?.price * product?.quantity}
        </Typography>
        <Button
          onClick={() => dispatch(removeItem(product?.product))}
          size={"small"}
        >
          Remove
        </Button>
      </Stack>
    </Stack>
  );
};

export default CartItem;
