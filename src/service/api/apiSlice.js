import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../query-builder/customQuery";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: ["User", "Organization", "Admin", "SuperAdmin"],
  endpoints: (builder) => ({}),
  keepUnusedDataFor: 50000,
});

export default apiSlice;
