import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import "../css/Jupop.css";

function Jupop(props) {
  const { message, backgroundColor, visibility, setVisibility } = props;

  // ------------------ States ------------------
  const [disappear, setDisappear] = useState(null);
  // ------------------ Effects  ------------------
  useEffect(() => {
    if (visibility === "visible") {
      setDisappear(
        setTimeout(() => {
          setVisibility("hidden");
        }, 3000)
      );
    }
  }, [visibility, setVisibility]);

  return (
    <div
      className={visibility === "hidden" ? "jupop hidden" : "jupop visible"}
      style={{ backgroundColor: backgroundColor, visibility: visibility }}
    >
      <button
        className="jupop-button"
        onClick={() => {
          setVisibility("hidden");
          clearTimeout(disappear);
          setDisappear(null);
        }}
      >
        <FiX className="x-icon" color="color" />
      </button>
      <div className="jupop-content">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Jupop;
