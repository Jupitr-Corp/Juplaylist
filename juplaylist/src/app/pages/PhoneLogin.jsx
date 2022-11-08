import React from "react";
import { useNavigate } from "react-router-dom";
import sentSMS from "../assets/illustrations/Hands-Message_Sent.png";
import "../css/PhoneLogin.css";
import OTPInput from "../components/OTPInput";

function PhoneLogin(props) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (window.confirmationResult === undefined) {
      navigate("/login");
    }
  }, []);

  const verifyOTP = (code) => {
    if (code.length === 6) {
      console.log(code);
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
      <div className="images">
        <img className="image" src={sentSMS} alt="hands with phone" />
      </div>
      <div className="mobile-container">
        <h3>We have sent you the verification code</h3>
        <p>
          Did not receive anything ?{" "}
          <span
            className="underline cursor"
            onClick={() => console.log("test")}
          >
            Retry
          </span>
        </p>
        <OTPInput
          className="OtpInput"
          numberInput={6}
          onChange={(final) => verifyOTP(final)}
        ></OTPInput>
      </div>
    </div>
  );
}

export default PhoneLogin;
