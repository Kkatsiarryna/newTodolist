import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectIsLoggedIn, selectThemeMode, setIsLoggedIn } from "app/appSlice"
import { getTheme } from "common/theme"
import { useCaptchaURLQuery, useLoginMutation } from "../../api/authApi"
import { SubmitHandler, useForm } from "react-hook-form"
import { LoginArgs } from "../../api/authApi.types"
import { ResultCode } from "../../../todolists/lib/enums"

export const useLogin = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const theme = getTheme(themeMode)

  const dispatch = useAppDispatch()

  const [login] = useLoginMutation()

  const { data: captchaUrl } = useCaptchaURLQuery()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginArgs>({ defaultValues: { email: "", password: "", rememberMe: false, captcha: "" } })

  //RTK QUERY
  const onSubmit: SubmitHandler<LoginArgs> = (data) => {
    login(data)
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
          localStorage.setItem("sn-token", res.data.data.token)
        }
      })
      .finally(() => {
        reset()
      })
  }

  //REDUX
  // const onSubmit: SubmitHandler<Inputs> = (data) => {
  //   // console.log(data)
  //   dispatch(loginTC(data))
  //   reset()
  // }

  return { isLoggedIn, theme, handleSubmit, onSubmit, control, errors, register, captchaUrl }
}
