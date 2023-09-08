import {
  Card,
  CardContent,
  Icon,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../api/searchSlice";
import { useNavigate } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const CatagoryCard = ({ cat }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Card
      elevation={0}
      sx={{
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: "15px",
        textAlign: "center",
        cursor: "pointer",
      }}
      onClick={() => {
        dispatch(setCategory(cat.name === "All categories" ? "" : cat.name));
        navigate("/products");
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          minWidth: "200px",
          gap: "0.5rem",
        }}
      >
        <Typography
          variant={"h4"}
          fontWeight={400}
          color={theme.palette.primary.main}
        >
          {cat.name}
        </Typography>
        <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
          <Typography variant={"h5"}>Shop Now</Typography>
          <Icon sx={{ fontSize: "2rem" }}>
            <ArrowRightAltIcon fontSize="2rem" />
          </Icon>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CatagoryCard;
