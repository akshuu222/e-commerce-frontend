import { api } from "./apiSlice";

export const productapi = api.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (form) => ({
        url: "/admin/product/add",
        method: "POST",
        body: form,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "/admin/products",
        method: "GET",
      }),
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.products.map(({ _id }) => ({
                type: "Products",
                id: _id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Poducts', id: 'LIST' }` is invalidated
            [{ type: "Products", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, myForm }) => {
        return {
          url: `/admin/product/${id}`,
          method: "PUT",
          body: myForm,
        };
      },
      invalidatesTags: (result, error, { id }) => {
        return [{ type: "Products", id }];
      },
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => {
        return [{ type: "Products", id }];
      },
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productapi;
