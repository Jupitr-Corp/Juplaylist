import React from "react";
import { authentication, app } from "./firebase-config";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ path, children, ...props }) {
  const navigate = useNavigate();
  authentication.onAuthStateChanged((user) => {
    if (!user) {
      navigate(path);
    } else {
      authentication.signOut();
    }
  });

  return children;
}
