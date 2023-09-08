import { api } from "./apiSlice";

export const reviewapi = api.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (form) => ({
        url: "/addcomment",
        method: "PUT",
        body: form,
      }),
      invalidatesTags: ["SingleProduct"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/admin/orders",
        method: "GET",
      }),
    }),
    deleteOrders: builder.mutation({
      query: (id) => ({
        url: `/admin/order/${id}`,
        method: "DELETE",
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, status }) => {
        return {
          url: `/admin/order/${id}`,
          method: "PUT",
          body: { status },
        };
      },
    }),
  }),
});

export const { useAddReviewMutation } = reviewapi;
