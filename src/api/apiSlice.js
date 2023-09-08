import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["Users", "Products", "SingleProduct"],
});

// https://ecommerce-kn7a.onrender.com
