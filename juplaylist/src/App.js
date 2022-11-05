import React, { useState, useEffect } from "react";
import "./app/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/pages/Layout";
import Home from "./app/pages/Home";
import Account from "./app/pages/Account";
import NoPage from "./app/pages/NoPage";
import PhoneLogin from "./app/pages/PhoneLogin";

function App() {
  // ------------------ State ------------------
  const [platform, setPlatform] = useState(null);

  // ------------------ Functions ------------------
  const getOs = () => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) {
      return "Android";
    } else if (
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    ) {
      return "iOS";
    }
    return "Other";
  };

  // ------------------ Effects ------------------

  useEffect(() => {
    console.log(getOs());
    setPlatform(getOs());
  }, [platform]);

  // ------------------ Render ------------------
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home platform={platform} />} />
          <Route path="login" element={<Account />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
