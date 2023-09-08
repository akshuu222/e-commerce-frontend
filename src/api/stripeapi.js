import { api } from "./apiSlice";

export const stripeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStripeApiKey: builder.query({
      query: () => ({
        url: "/stripeapikey",
        method: "GET",
      }),
    }),
    Secretkey: builder.mutation({
      query: (data) => ({
        url: "/payment/process",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetStripeApiKeyQuery, useSecretkeyMutation } = stripeApi;
