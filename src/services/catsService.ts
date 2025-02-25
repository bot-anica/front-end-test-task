import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICat } from "../entities";

const API_KEY =
  "live_ZUe7htq4BjB2mFH6pnQirfvfoI1r7ovxtB42aQRTGTWHpWvZTHtJufzvQWqaPp1f";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.thecatapi.com/v1",
  prepareHeaders: (headers) => {
    headers.set("x-api-key", API_KEY);
    return headers;
  },
});

const baseQueryWithRetry = async (args: any, api: any, extraOptions: any) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error) {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		result = await baseQuery(args, api, extraOptions);
	}
	return result;
};

export const catsApi = createApi({
  reducerPath: "catsApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Breeds"],
  endpoints: (builder) => ({
    getBreeds: builder.query<ICat[], void>({
      query: () => "breeds",
      providesTags: ["Breeds"],
    }),
    getBreedById: builder.query<ICat, string>({
      query: (breedId) => `breeds/${breedId}`,
      providesTags: (_result, _error, breedId) => [
        { type: "Breeds", id: breedId },
      ],
    }),
  }),
});

export const { useGetBreedsQuery, useGetBreedByIdQuery } = catsApi

export const { endpoints, reducerPath, reducer, middleware } = catsApi
