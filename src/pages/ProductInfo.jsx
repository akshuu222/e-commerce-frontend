import {
  Box,
  Button,
  Card,
  Dialog,
  IconButton,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReviewCard from "../components/ReviewCard";
import { shipping } from "../utils/product.js";
import NewArrivals from "../components/NewArrivals";
import { useGetProductByIdQuery } from "../api/userProductapi";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { addtocart } from "../api/cart";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useAddReviewMutation } from "../api/reviews";

const ProductInfo = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [count, setCount] = useState(1);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetProductByIdQuery(id);

  const [reviewApi, { isLoading: reviewLoading }] = useAddReviewMutation();

  const increaseCount = () => {
    if (count >= data?.product?.stock) return;
    setCount((prev) => prev + 1);
  };
  const decreaseCount = () => {
    if (count <= 1) return;
    setCount((prev) => prev - 1);
  };

  const handleCart = () => {
    dispatch(addtocart({ product: data?.product, quantity: count }));
    toast.success("Added to cart");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await reviewApi({
        rating: rating,
        comment: review,
        productid: data?.product?._id,
      }).unwrap();
      toast.success(res.message);
      setReview("");
      setRating(0);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <>
      {isLoading || reviewLoading ? (
        <Loading />
      ) : (
        <>
          <Box
            maxWidth={"1300px"}
            padding={"0.5rem"}
            sx={{
              margin: { xs: "6rem auto 1rem auto", md: "7rem auto 2rem auto" },
            }}
          >
            <Box
              minHeight={"50vh"}
              display={"flex"}
              gap={2}
              sx={{
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                flex={1}
                height={"70vh"}
                maxHeight={"70vh"}
                sx={{ width: { xs: "100%", md: "50%" } }}
                alignSelf={"flex-start"}
              >
                <Swiper
                  style={{ width: "100%", height: "100%" }}
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  navigation={true}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Navigation, Autoplay, Pagination]}
                >
                  {data?.product?.images?.map((i, index) => (
                    <SwiperSlide
                      key={index}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <img
                        src={i?.url}
                        alt="product"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
              <Stack
                flex={1}
                minHeight={"50vh"}
                sx={{
                  gap: { xs: "1rem", md: "1.5rem" },
                  paddingTop: { xs: "1rem", md: "1rem" },
                }}
              >
                <Typography variant="h2" fontWeight={600}>
                  {data?.product?.name}
                </Typography>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Rating
                    value={data?.product?.ratings}
                    readOnly
                    size={"large"}
                  />
                  <Typography>{data?.product?.reviews?.length}</Typography>
                </Stack>
                <Typography
                  variant="h3"
                  fontWeight={700}
                  color={theme.palette.primary.main}
                >
                  {data?.product?.price}
                </Typography>
                <Stack
                  width={"122px"}
                  direction={"row"}
                  alignItems={"center"}
                  border={"1px solid black"}
                  borderRadius={"40px"}
                  justifyContent={"space-between"}
                  bgcolor={"#F5F8FB"}
                  padding={"0.5rem"}
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
                    readOnly
                    value={count}
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
                <Stack>
                  <Typography variant={"body1"}>
                    {data?.product?.description}
                  </Typography>
                </Stack>
                <Stack direction={"row"} gap={"1rem"}>
                  <Button
                    onClick={handleCart}
                    variant="contained"
                    endIcon={<ShoppingCartIcon />}
                  >
                    cart
                  </Button>
                  <Button
                    onClick={() => setOpen(true)}
                    variant="contained"
                    endIcon={<FavoriteIcon />}
                  >
                    Review
                  </Button>
                </Stack>
                <Stack
                  direction={"row"}
                  flexWrap={"wrap"}
                  gap={2}
                  justifyContent={"center"}
                >
                  {shipping.map((ship, index) => (
                    <Stack
                      key={index}
                      padding={"2rem 1rem"}
                      boxSizing={"border-box"}
                      bgcolor={ship.color}
                      minWidth={"280px"}
                      borderRadius={"15px"}
                      gap={"0.5rem"}
                    >
                      <Stack alignItems={"flex-start"}>
                        <img
                          src={ship.image}
                          alt="shipment"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                          }}
                        />
                      </Stack>
                      <Typography variant="h4" fontWeight={600}>
                        {ship.name}
                      </Typography>
                      <Typography variant="h5" color={"grey"}>
                        {ship.title}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Box>
            <Stack sx={{ mt: { xs: "1rem", md: "2rem" }, gap: "1rem", mb: 2 }}>
              <Typography
                variant="h2"
                color={theme.palette.primary.main}
                fontWeight={500}
              >
                Ratings and Reviews
              </Typography>
              <Stack direction={"row"} overflow={"auto"} gap={"0.5rem"}>
                {data?.product?.reviews?.length === 0 ? (
                  <Typography mt={5} variant={"h2"} color={"black"}>
                    No Reviews Yet
                  </Typography>
                ) : (
                  data?.product?.reviews?.map((r, index) => (
                    <ReviewCard review={r} key={index} />
                  ))
                )}
              </Stack>
            </Stack>
            <NewArrivals
              first={"Related"}
              second={"Products"}
              list={data?.relatedProducts}
            />
          </Box>

          <Dialog open={open} onClose={() => setOpen(false)}>
            <Card
              sx={{
                gap: 3,
                width: "350px",
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
              component={"form"}
              onSubmit={handleSubmit}
            >
              <Typography
                variant="h2"
                color={theme.palette.primary.main}
                fontWeight={600}
                textAlign={"center"}
              >
                Submit Review
              </Typography>
              <Rating
                value={Number(rating)}
                onChange={(e) => setRating(e.target.value)}
                size={"large"}
              />
              <textarea
                style={{ padding: "1rem" }}
                rows={5}
                cols={5}
                placeholder="Enter Your Review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Button onClick={() => setOpen(false)} variant={"outlined"}>
                  Cancel
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  type={"submit"}
                  variant={"contained"}
                >
                  Submit
                </Button>
              </Stack>
            </Card>
          </Dialog>
        </>
      )}
    </>
  );
};

export default ProductInfo;
