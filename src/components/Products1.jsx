import { Box } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";

const Products1 = ({ featuredProducts }) => {
  return (
    <Box
      py={2}
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      columnGap={"1rem"}
      rowGap={"2rem"}
    >
      {featuredProducts?.map((p, index) => (
        <ProductCard key={index} product={p} />
      ))}
    </Box>
  );
};

export default Products1;
