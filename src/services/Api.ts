import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://makeup-api.herokuapp.com/api/v1", 
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
  }),
});

export const { useGetProductsQuery } = api;
