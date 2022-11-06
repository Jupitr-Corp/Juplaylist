import React from "react";
import { useNavigate } from "react-router-dom";
import sentSMS from "../assets/illustrations/Hands-Message_Sent.png";

function PhoneLogin(props) {
  const navigate = useNavigate();

  if (window.confirmationResult === undefined) {
    //navigate("/login");
  }

  const verifyOTP = (code) => {
    console.log(code);
    if (code.length === 6) {
      window.confirmationResult
        .confirm(code)
        .then((result) => {
          console.log(result);
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="phone-login-container">
      <div>
        <img src={sentSMS} alt="hands with phone" />
      </div>
      <div className="mobile-container">
        <h3>Enter your phone number</h3>
        <p>We will send you the one time pin</p>
        <input type="text" onChange={(e) => verifyOTP(e.target.value)} />
      </div>
    </div>
  );
}

export default PhoneLogin;
