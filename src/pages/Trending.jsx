import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import Products1 from "../components/Products1";
import Products2 from "../components/Products2";

const Trending = ({ featuredProducts, popularProducts }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box width={"100%"} margin={"1rem auto"}>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where selection follows focus"
        selectionFollowsFocus
      >
        <Tab label="Featured" />
        <Tab label="Popular" />
      </Tabs>
      {value === 0 && <Products1 featuredProducts={featuredProducts} />}
      {value === 1 && <Products2 popularProducts={popularProducts} />}
    </Box>
  );
};

export default Trending;
