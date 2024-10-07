import { api } from "../../services/Api";

const Api = api.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: "/products.json"
            }),
            providesTags: ["Product"],
        }),
        getProductsByBrand: builder.query({
            query: (type) => ({
                url: `/products.json?product_type=${type}`,
            }),
            providesTags: ["Product"],
        }),
        getBrand: builder.query({
            query: (brand) => ({
                url: `/products.json?brand=${brand}`,
            }),
            providesTags: ["Product"],
        }),
        getProduct: builder.query({
            query: (product) => ({
                url: `/products.json?product_type=${product}`,
            }),
            providesTags: ["Product"],
        }),
    }),
});

export const { useGetProductsQuery, useGetProductsByBrandQuery, useGetBrandQuery, useGetProductQuery } = Api;