import { api } from "./apiSlice";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({

    newOrder: builder.mutation({
      query: (form) => ({
        url: "/order/new",
        method: "POST",
        body: form,
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/admin/orders",
        method: "GET",
      }),
    }),
    getMyOrder: builder.query({
      query: () => ({
        url: "/orders/me",
        method: "GET",
      }),
    }),
    deleteOrders: builder.mutation({
      query: (id) => ({
        url: `/admin/order/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          orderApi.util.updateQueryData("getAllOrders", undefined, (draft) => {
            const index = draft.orders?.findIndex((item) => item._id === id);
            draft?.orders?.splice(index, 1);
          })
        );
      },
    }),
    updateOrder: builder.mutation({
      query: ({ id, status }) => {
        return {
          url: `/admin/order/${id}`,
          method: "PUT",
          body: { status },
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          orderApi.util.updateQueryData("getAllOrders", undefined, (draft) => {
            const index = draft.orders?.findIndex((item) => item._id === id);
            draft?.orders?.splice(index, 1, data?.order);
          })
        );
      },
    }),
  }),
});

export const {
  useNewOrderMutation,
  useGetAllOrdersQuery,
  useDeleteOrdersMutation,
  useUpdateOrderMutation,
  useGetMyOrderQuery
} = orderApi;
