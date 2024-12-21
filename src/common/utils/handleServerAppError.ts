// import { AppDispatch } from "app/store"
// import { BaseResponse } from "common/types"
// import { setAppError, setAppStatus } from "app/appSlice"
//
// export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: AppDispatch) => {
//   dispatch(setAppStatus({ status: "failed" }))
//   if (data.messages.length) {
//     dispatch(setAppError({ error: data.messages[0] }))
//   } else {
//     dispatch(setAppError({ error: "Some error occurred" }))
//   }
// }
