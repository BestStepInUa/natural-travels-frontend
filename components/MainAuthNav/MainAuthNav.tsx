"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import css from "./MainAuthNav.module.css"

export default function MainAuthNav(){
  const pathname = usePathname()
  return(
    <div className={css.container}>
      <Link
      href="/register"
      className={`${css.register} ${pathname === "/register" ? css.active : ""}`}>
      Реєстрація
      </Link>
        <Link href="/login" className={`${css.login} ${pathname === "/login" ? css.active : ""}`}>
      Вхід
      </Link>
    </div>
  )
}