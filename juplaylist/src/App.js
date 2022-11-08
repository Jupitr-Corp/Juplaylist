import React from "react";
import "./app/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/pages/Layout";
import Home from "./app/pages/Home";
import Login from "./app/pages/Login";
import NoPage from "./app/pages/NoPage";
import PhoneLogin from "./app/pages/PhoneLogin";

function App() {
  // ------------------ Render ------------------
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="login/phone" element={<PhoneLogin />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
