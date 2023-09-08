import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addtocart } from "../api/cart";

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleCart = (product) => {
    dispatch(addtocart({ product, quantity: 1 }));
    toast.success("Added to cart");
  };

  return (
    <Card
      sx={{
        maxWidth: "340px",
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: "20px",
        padding: "0.5rem",
        maxHeight: "480px",
      }}
    >
      <Link to={`/product/${product?._id}`}>
        <CardActionArea>
          <CardMedia
            src={product?.images[0]?.url}
            component={"img"}
            width={"320px"}
            height={"300px"}
            sx={{
              objectFit: "contain",
              borderRadius: "20px",
              minWidth: "320px",
            }}
          />
          <CardContent>
            <Typography
              gutterBottom
              fontWeight={600}
              color={"primary"}
              variant={"h5"}
            >
              {product?.name?.toUpperCase()}
            </Typography>
            <Stack
              mb={1}
              direction={"row"}
              alignItems={"center"}
              spacing={"20px"}
            >
              <Rating readOnly value={Number(product?.ratings)} />
              <Typography>({product?.reviews?.length} reviews)</Typography>
            </Stack>
            <Typography fontWeight={600} color={"primary"}>
              ${product?.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions sx={{ display: "flex", alignItems: "center" }}>
        <Button onClick={() => handleCart(product)}>Cart</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
