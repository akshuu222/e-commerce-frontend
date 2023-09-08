import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { brands } from "../utils/brands";
import BrandCard from "./BrandCard";

const Brand = () => {
  const theme = useTheme();
  return (
    <Stack mt={4} spacing={5} py={2}>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Typography
          variant="h2"
          fontWeight={600}
          color={theme.palette.primary.main}
        >
          Our
        </Typography>
        <Typography variant="h2" fontWeight={600} color={"black"}>
          Brands
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
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            0: {
              slidesPerView: 4,
              spaceBetween: 2,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
          className="mySwiper"
        >
          {brands.map((brand, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BrandCard brand={brand} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
    </Stack>
  );
};

export default Brand;
