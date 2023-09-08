import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

const NewArrivals = ({ first, second, list }) => {
  const theme = useTheme();

  return (
    <Stack mt={1} spacing={2} py={4}>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Typography
          variant="h2"
          fontWeight={500}
          color={theme.palette.primary.main}
        >
          {first}
        </Typography>
        <Typography variant="h2" fontWeight={500} color={"black"}>
          {second}
        </Typography>
      </Stack>
      <Stack
        width={"100%"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        overflow={"hidden"}
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3.7,
              spaceBetween: 10,
            },
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {list?.map((n, index) => (
            <SwiperSlide
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              key={index}
            >
              <ProductCard product={n} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
    </Stack>
  );
};

export default NewArrivals;
