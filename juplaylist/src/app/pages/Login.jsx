import React from "react";
import hands_phone from "../assets/illustrations/Hands-Phone.png";
import PhoneInput from "../components/PhoneInput";
import "../css/Login.css";
import { authentication } from "../components/firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (authentication.currentUser !== null) {
      console.log("User is already logged in");
      navigate("/home");
    }
  }, []);

  const [phoneNumber, setPhoneNumber] = React.useState("");

  const generateRecaptchaVerifier = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-verifier",
      {
        size: "invisible",
        callback: (response) => {},
      },
      authentication
    );
  };

  function submit() {
    if (
      /^(?:[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)\d(?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/.test(
        phoneNumber
      )
    ) {
      generateRecaptchaVerifier();
      signInWithPhoneNumber(
        authentication,
        "+33" +
          (phoneNumber.length === 10 ? phoneNumber.slice(1) : phoneNumber),
        window.recaptchaVerifier
      )
        .then((confirmationResult) => {
          console.log(confirmationResult);
          window.confirmationResult = confirmationResult;
          navigate("/login/phone");
        })
        .catch((error) => {
          // Error; SMS not sent
          console.log(error);
        });
    }
  }

  return (
    <div className="account-container">
      <div>
        <img src={hands_phone} alt="hands with phone" />
      </div>
      <div className="mobile-container">
        <h3>Enter your phone number</h3>
        <p>We will send you the one time pin</p>
        <PhoneInput code="+33" onTextChange={setPhoneNumber} />
        <button onClick={() => submit()}>Send</button>
        <div id="recaptcha-verifier"></div>
      </div>
    </div>
  );
}

export default Login;
