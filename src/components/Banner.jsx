import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import Banner1 from "../banners/Banner1";
import bannerImage1 from "../images/OILHK60.jpg";
import bannerImage2 from "../images/banner4.avif";
import bannerImage3 from "../images/banner 2.png";

const banners = [
  {
    image: bannerImage3,
    first: "Discover how the",
    middle: " future looks in our",
    last: " clothes",
    subtitle:"Clothing,bags,Wallets",
    color:"#63A2C1"
  },
  {
    image: bannerImage1,
    first: "Get the decibels delivered ",
    middle: " to your ears",
    last: " perfectly",
    subtitle:"mobile,laptops and acessories",
    color:"#D77F7A"
  },
  {
    image: bannerImage2,
    first: "Step into something",
    middle: " special with our",
    last: " shoes",
    subtitle:"Sneakers,Filp Flops and casual Shoes",
    color:"#088178"
  },
];

const Banner = () => {
  return (
    <Box width={"100%"} height={"80vh"} maxHeight={"80vh"}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide className="swiperSlide" key={index}>
            <Banner1 banner={banner} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Banner;
