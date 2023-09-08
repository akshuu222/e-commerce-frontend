import { api } from "./apiSlice";

export const userProductapi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleProduct"],
    }),
    getfeaturedProduct: builder.query({
      query: () => ({
        url: `/featuredProduct`,
        method: "GET",
      }),
      providesTags: ["SingleProduct"],
    }),
    getProduct: builder.query({
      query: (url) => {
        const category = url?.category === undefined ? "" : url?.category;
        const price = url?.price === undefined ? "" : url?.price;
        const ratings = url?.ratings === undefined ? "" : url?.ratings;
        const sort = url?.sort === undefined ? "" : url?.sort;
        const newest = url?.newest === undefined ? false : url?.newest;
        const search = url?.keyword === undefined ? "" : url?.keyword;
        const page = url?.page;
        let link = `/products?category=${category}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&sort=${sort}&createdat=${newest}&page=${page}&keyword=${search}`;
        return {
          url: link,
          method: "GET",
        };
      },
      providesTags: ["SingleProduct"],
    }),
  }),
});

export const {
  useGetProductByIdQuery,
  useGetProductQuery,
  useGetfeaturedProductQuery,
} = userProductapi;
