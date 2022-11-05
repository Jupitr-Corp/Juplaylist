import React from "react";
import "./app/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/pages/Layout";
import Home from "./app/pages/Home";
import Account from "./app/pages/Account";
import NoPage from "./app/pages/NoPage";
import PhoneLogin from "./app/pages/PhoneLogin";

function App() {
  // ------------------ State ------------------

  // ------------------ Functions ------------------

  // ------------------ Effects ------------------

  // ------------------ Render ------------------
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
