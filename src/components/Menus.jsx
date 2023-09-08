import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { categories } from "../utils/categories";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCategory } from "../api/searchSlice";

const Menus = ({ handleClose, anchorEl }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const close = (e, v, cat) => {
    handleClose(e, v, cat?.name);
    dispatch(setCategory(cat?.name === "All categories" ? "" : cat?.name));
    navigate("/products");
  };

  return (
    <Menu
      className="menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      sx={{ maxHeight: "300px", position: "absolute", top: "1%" }}
    >
      {categories.map((cat, index) => (
        <MenuItem key={index} onClick={(e, v) => close(e, v, cat)}>
          {cat.name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default Menus;
