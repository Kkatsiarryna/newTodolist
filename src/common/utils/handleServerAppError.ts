import { setAppErrorAC, setAppStatusAC } from "app/app-reducer"
import { AppDispatch } from "app/store"
import { BaseResponse } from "common/types"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("failed"))
  dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : "Some error occurred"))
}
