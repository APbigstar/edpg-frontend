import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Backend Api
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL || "http://localhost:5000",
  }), // base url
  reducerPath: "adminApi",
  // tags
  tagTypes: [
    "User",
    "Producs",
    "Users",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  // endpoints
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getUsers: build.query({
      query: () => "client/users",
      providesTags: ["Users"],
    }),
    getScores: build.query({
      query: () => "management/scores",
      providesTags: ["Dashboard"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    updateUser: build.mutation({
      query: (data) => {
        const { _id, ...userData } = data;
        const method = userData.isNew === false ? "PUT" : "POST";
        const url =
          userData.isNew === false
            ? `management/user/${_id}`
            : "management/user";

        return {
          url,
          method,
          body: userData,
        };
      },
      invalidatesTags: ["Users", "Admins"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `management/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User", "Admins"],
    }),
    getQuestions: build.query({
      query: (params) => {
        const url = `management/questions?category=${params.category}&type=${params.type}`;
        const method = "GET";
        return {
          url,
          method,
        };
      },
      providesTags: ["Users"],
    }),
    updateQuestion: build.mutation({
      query: (data) => {
        const { _id, ...userData } = data;
        console.log(userData);
        const method = userData.isNew === false ? "PUT" : "POST";
        const url =
          userData.isNew === false
            ? `management/question/${_id}`
            : "management/question";

        return {
          url,
          method,
          body: userData,
        };
      },
      invalidatesTags: ["Questions"],
    }),
    deleteQuestion: build.mutation({
      query: (id) => ({
        url: `management/question/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Questions"],
    }),
  }),
});

// export api endpoints
export const {
  useGetUserQuery,
  useGetUsersQuery,
  useGetScoresQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetQuestionsQuery,
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
} = api;
