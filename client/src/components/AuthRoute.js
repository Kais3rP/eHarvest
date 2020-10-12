import React from "react"
import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router"

export default function AuthRoute({type}) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  if (type === "guest" && isLoggedIn) return <Redirect to="/" />
  if (type === "private" && !isLoggedIn) return <Redirect to="/login" />

  return <Route {...props} />
}
