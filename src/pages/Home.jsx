import React from "react";
import Features from "../components/Features";
import { Box } from "@mui/material";
import Trending from "./Trending";
import Banner from "../components/Banner";
import NewArrivals from "../components/NewArrivals";
import Catagories from "../components/Catagories";
import Brands from "../components/Brands";
import NewsLetter from "../components/NewsLetter";
import { useGetfeaturedProductQuery } from "../api/userProductapi";
import Loading from "../components/Loading";

const Home = () => {
  const { data, isLoading } = useGetfeaturedProductQuery();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            margin: { xs: "5.3rem auto 1rem auto", md: "5rem auto 2rem auto" },
            minHeight: "200vh",
            maxWidth: "1300px",
          }}
        >
          <Banner />
          <Features />
          <Trending
            featuredProducts={data?.featuredProducts}
            popularProducts={data?.popularProducts}
          />
          <Catagories />
          <NewArrivals
            first={"New"}
            second={"Arrivals"}
            list={data?.newProducts}
          />
          <Brands />
          <NewsLetter />
        </Box>
      )}
    </>
  );
};

export default Home;
