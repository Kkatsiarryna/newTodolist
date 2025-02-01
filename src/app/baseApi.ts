import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { handleError } from "common/utils"

export const baseApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`)
        headers.set("Authorization", `Bearer ${localStorage.getItem("sn-token")}`)
      },
    })(args, api, extraOptions)

    // debugger
    handleError(api, result)

    return result
  },
  endpoints: () => ({}),
  tagTypes: ["Todolist", "Task"],
  keepUnusedDataFor: 30, //изменить время кеша
  refetchOnFocus: true, //автоматически повторно запрашивать данные, когда окно приложения или вкладка браузера возвращаются в фокус
  refetchOnReconnect: true, // управляет повторным запросом данных, когда приложение или браузер восстанавливает соединение с интернетом после его потери
})
