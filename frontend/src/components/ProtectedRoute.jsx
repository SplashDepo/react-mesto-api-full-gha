import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element: Component, ...props }) {
  return (
    props.logedIn ? <Component {...props} /> : <Navigate to="/signin" replace />
  )
}