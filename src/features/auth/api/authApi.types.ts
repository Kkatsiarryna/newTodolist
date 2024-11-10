export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}

//type X = Omit<LoginArgs, 'captcha'>
