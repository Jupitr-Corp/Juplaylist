import React from "react";
import "../css/OTPInput.css";

export default function OTPInput({ numberInput, onChange, ...props }) {
  const [values, setValues] = React.useState(Array(numberInput).fill(""));
  const focus = React.useRef([]);

  const onInputChange = (e, index) => {
    if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode !== 8) {
      return;
    }
    if (e.keyCode !== 8) {
      setValues((prev) => {
        const newValues = [...prev];
        newValues[index] = String.fromCharCode(e.keyCode);
        return newValues;
      });
      if (index < numberInput - 1) {
        focus.current[index + 1].focus();
      }
    } else {
      if (index > 0 && values[index] === "") {
        focus.current[index - 1].focus();
      }
      setValues((prev) => {
        const newValues = [...prev];
        newValues[index] = "";
        return newValues;
      });
    }
    onChange(values.join(""));
  };

  const generateInputs = () => {
    let inputs = [];
    for (let i = 0; i < numberInput; i++) {
      inputs.push(
        <input
          key={i}
          type=""
          ref={(ref) => (focus.current[i] = ref)}
          maxLength="1"
          value={values[i]}
          onKeyDown={(e) => {
            onInputChange(e, i);
          }}
          className="otp-input"
        />
      );
    }
    return inputs;
  };

  return (
    <div className={"otp-inputs-container " + props.className}>
      {generateInputs()}
    </div>
  );
}
