import { LoginArgs } from "./authApi.types"
import { instance } from "common/instance"
import { BaseResponse } from "common/types"
import { baseApi } from "app/baseApi"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => "auth/me",
    }),
    login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginArgs>({
      query: (payload) => {
        return {
          method: "POST",
          url: "auth/login",
          body: payload,
        }
      },
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => {
        return {
          method: "DELETE",
          url: "auth/login",
        }
      },
    }),
    captchaURL: build.query<{ url: string }, void>({
      query: () => "/security/get-captcha-url",
    }),
  }),
})

export const { useMeQuery, useLoginMutation, useLogoutMutation, useCaptchaURLQuery } = authApi

export const _authApi = {
  login(payload: LoginArgs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>(`auth/login`, payload)
  },
  logout() {
    return instance.delete<BaseResponse>(`auth/login`)
  },
  me() {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("auth/me")
  },
}
