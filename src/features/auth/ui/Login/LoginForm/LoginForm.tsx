import { useLogin } from "../../../lib/hooks/useLogin"
import FormGroup from "@mui/material/FormGroup"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import { Controller } from "react-hook-form"
import Button from "@mui/material/Button"
import s from "../Login.module.css"
import Checkbox from "@mui/material/Checkbox"
import { useState } from "react"
import { LoginArgs } from "../../../api/authApi.types"

export const LoginForm = () => {
  const { onSubmit, handleSubmit, errors, register, control, captchaUrl } = useLogin()

  const [showCaptcha, setShowCaptcha] = useState(false)

  const onFormSubmit = async (data: LoginArgs) => {
    if (!showCaptcha) {
      setShowCaptcha(true)
    } else {
      await onSubmit(data)
    }
  }

  return (
    //<form onSubmit={handleSubmit(onSubmit)}>
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <FormGroup>
        <TextField
          label="Email"
          margin="normal"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Incorrect email address",
            },
          })}
        />
        {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
        <TextField
          type="password"
          label="Password"
          margin="normal"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password must be at least 3 characters long",
            },
          })}
        />
        {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}

        <FormControlLabel
          label={"Remember me"}
          control={
            <Controller
              name={"rememberMe"}
              control={control}
              render={({ field: { value, ...field } }) => <Checkbox {...field} checked={value} />}
            />
          }
        />
        {showCaptcha && captchaUrl && (
          <>
            <img alt="CAPTCHA" src={captchaUrl.url} />
            <TextField
              label="Captcha"
              margin="normal"
              {...register("captcha", {
                required: "Captcha is required",
              })}
            />
            {errors.captcha && <span className={s.errorMessage}>{errors.captcha.message}</span>}
          </>
        )}
        <Button type={"submit"} variant={"contained"} color={"primary"}>
          Login
        </Button>
      </FormGroup>
    </form>
  )
}
