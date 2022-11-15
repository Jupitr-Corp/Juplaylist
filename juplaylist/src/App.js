import React from "react";
import "./app/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./app/pages/Layout";
import Home from "./app/pages/Home";
import Login from "./app/pages/Login";
import NoPage from "./app/pages/NoPage";
import PhoneLogin from "./app/pages/PhoneLogin";
import Request from "./app/components/RequestComponent";
import PrivateRoute from "./app/components/PrivateRoute";

function App() {
  // ------------------ Render ------------------
  return (
    <Request>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <PrivateRoute path="/login">
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="login/phone" element={<PhoneLogin />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Request>
  );
}

export default App;
