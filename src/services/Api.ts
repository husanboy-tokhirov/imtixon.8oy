import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: retry(baseQuery, { maxRetries: 0 }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<any, void>({
      query: () => "/products.json",
      providesTags: ["Product"],
    }),
    getProductsByBrand: builder.query<any, string>({
      query: (brand) => `/products.json?brand=${brand}`,
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductsByBrandQuery } = api;