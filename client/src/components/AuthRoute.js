import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

export default function AuthRoute (props) {
    const isLoggedIn = useSelector( state => state.user.isLoggedIn );
  if (props.type === "guest" && isLoggedIn) return <Redirect to="/" />;
  else if (props.type === "private" && !isLoggedIn) return <Redirect to="/login" />;

  return <Route {...props} />;
};
