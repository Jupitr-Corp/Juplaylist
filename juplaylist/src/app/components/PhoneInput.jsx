import React from "react";
import "../css/PhoneInput.css";

function PhoneInput({ onTextChange, code, ...props }) {
  return (
    <fieldset className="phoneInput">
      <legend>Mobile</legend>
      <div>
        <p>{code}</p>
        <hr></hr>
        <input
          type="tel"
          maxLength={10}
          onChange={(text) => onTextChange(text.target.value)}
          placeholder="0X XX XX XX XX"
        />
      </div>
    </fieldset>
  );
}

export default PhoneInput;
