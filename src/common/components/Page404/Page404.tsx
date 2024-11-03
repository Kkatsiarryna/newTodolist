import s from "./Page404.module.css"
import { useNavigate } from "react-router-dom"

export const Page404 = () => {
  const navigate = useNavigate()
  const goToHomeHandler = () => {
    navigate("/")
  }
  return (
    <div className={s.main}>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <button className={s.button} onClick={goToHomeHandler}>
        Go to home!
      </button>
    </div>
  )
}
