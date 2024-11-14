import s from "./Page404.module.css"
import { Link } from "react-router-dom"
import { Path } from "common/router/router"

export const Page404 = () => {
  return (
    <div className={s.main}>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <Link to={Path.Main} className={s.button}>
        Go to home!
      </Link>
    </div>
  )
}
