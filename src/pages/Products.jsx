import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Pagination,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { categories } from "../utils/categories";
import { useGetProductQuery } from "../api/userProductapi";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSearch } from "../api/searchSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { search, category } = useSelector((state) => state.search);
  const theme = useTheme();

  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, []);

  const [price, setPrice] = useState([0, 200000]);
  const [ratings, setRatings] = useState(0);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetProductQuery({
    category: category,
    price: price,
    ratings: ratings,
    sort: sort,
    page: page,
    keyword: search,
  });

  const handleReset = () => {
    setCategory("");
    setPrice([0, 200000]);
    setRatings(0);
    setSort("");
    dispatch(setSearch(""));
  };

  return (
    <Box
      sx={{
        margin: { xs: "5.3rem auto 1rem auto", md: "5rem auto 2rem auto" },
        minHeight: "200vh",
        maxWidth: "1380px",
        display: { xs: "flex", md: "grid" },
        flexDirection: { xs: "column-reverse", md: "none" },
        alignItems: { xs: "center", md: "stretch" },
        gridTemplateColumns: "0.3fr 1fr",
        columnGap: "1rem",
        pt: { xs: 2, md: 5 },
        gap: { xs: "2rem", md: "1rem" },
      }}
    >
      <Stack
        width={"100%"}
        alignItems={"center"}
        padding={"0.5rem"}
        gap={"1rem"}
      >
        <Stack
          minHeight={"30vh"}
          border="1px solid black"
          borderRadius={"15px"}
          width={"100%"}
          gap={2}
          boxSizing={"border-box"}
          p={2}
          pl={5}
        >
          <Typography
            color={theme.palette.primary.main}
            fontWeight={600}
            variant="h4"
          >
            Category
          </Typography>
          <Divider flexItem />
          <Stack gap={2}>
            {categories.map((c, index) => (
              <Typography
                sx={{ cursor: "pointer" }}
                variant={"body1"}
                key={index}
                onClick={() => {
                  setPage(1);
                  c.name === "All categories"
                    ? dispatch(setCategory(""))
                    : dispatch(setCategory(c.name));
                }}
              >
                {c.name}
              </Typography>
            ))}
          </Stack>
        </Stack>
        <Stack
          minHeight={"30vh"}
          border="1px solid black"
          borderRadius={"15px"}
          width={"100%"}
          gap={2}
          boxSizing={"border-box"}
          p={2}
          pl={5}
        >
          <Typography
            color={theme.palette.primary.main}
            fontWeight={600}
            variant="h4"
          >
            FILL BY
          </Typography>
          <Divider flexItem />
          <Stack>
            <Typography variant="h5">Price</Typography>
            <Slider
              value={price}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={200000}
              onChange={(e, price) => {
                setPage(1);
                setPrice(price);
              }}
            />
          </Stack>
          <Stack>
            <Typography variant="h5">Rating</Typography>
            <Slider
              value={ratings}
              onChange={(e, r) => {
                setPage(1);
                setRatings(r);
              }}
              max={5}
              min={0}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
            />
          </Stack>
          <Stack>
            <Typography variant="h5" gutterBottom>
              Sort Order
            </Typography>
            <FormGroup sx={{ display: "flex", flexDirection: "column" }}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={sort}
                onChange={(e) => {
                  setPage(1);
                  setSort(e.target.value);
                }}
              >
                <FormControlLabel
                  value={-1}
                  control={<Radio />}
                  label="Price High - Low"
                />
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Price Low - High"
                />
              </RadioGroup>
            </FormGroup>
            <Button onClick={handleReset} sx={{ mt: 2 }} variant={"contained"}>
              Reset
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {isLoading ? (
        <Loading />
      ) : (
        <Stack width={"100%"} sx={{ gap: { xs: 4, md: 10 } }}>
          <Stack
            width={"100%"}
            flexDirection={"row"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            rowGap={3}
            columnGap={2}
          >
            {data?.products[0]?.documents?.map((p, index) => (
              <ProductCard key={index} product={p} />
            ))}
          </Stack>
          {data?.products[0]?.totalCount > 8 && (
            <Pagination
              count={Math.ceil(data?.products[0]?.totalCount / 8)}
              size={"medium"}
              color={"primary"}
              onChange={(e, pageNo) => {
                setPage(pageNo);
                window.scroll(0, 0);
              }}
              page={page}
              sx={{ alignSelf: "center", justifySelf: "center" }}
            />
          )}
        </Stack>
      )}
    </Box>
  );
};

export default Products;
