import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import CatagoryCard from "./CatagoryCard";
import { categories } from "../utils/categories";

const Catagories = () => {
  const theme = useTheme();
  return (
    <Stack mt={4} spacing={2} py={2}>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Typography
          variant="h2"
          fontWeight={600}
          color={theme.palette.primary.main}
        >
          Shop By
        </Typography>
        <Typography variant="h2" fontWeight={600} color={"black"}>
          Catagories
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
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {categories.map((cat, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CatagoryCard cat={cat} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
    </Stack>
  );
};

export default Catagories;
