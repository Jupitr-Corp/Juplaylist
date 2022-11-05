import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import "../css/Jupop.css";

function Jupop(props) {
  const { message, backgroundColor, visibility, setVisibility } = props;

  // ------------------ States ------------------

  // ------------------ Effects  ------------------
  let viAnim;
  useEffect(() => {
    if (visibility === "visible") {
      viAnim = setTimeout(() => {
        setVisibility("hidden");
      }, 3000);
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
          clearTimeout(viAnim);
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