import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtocart: (state, action) => {
      const { product, quantity } = action.payload;
      const item = {
        product: product?._id ? product?._id : product.product,
        name: product.name,
        ratings: product.ratings,
        numberOfReviews: product.numberofreviews,
        price: product.price,
        image: Array.isArray(product?.images)
          ? product?.images[0]
          : product?.image,
        stock: product.stock,
        quantity,
      };
      const itemExists = state.cartItems.find(
        (ci) => ci.product === item.product
      );
      if (itemExists) {
        state.cartItems = state.cartItems.map((ci) =>
          ci.product === item.product ? item : ci
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (p) => p.product !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
    removeAllProducts: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addtocart, removeItem, saveShippingInfo, removeAllProducts } =
  cartSlice.actions;

export default cartSlice.reducer;
