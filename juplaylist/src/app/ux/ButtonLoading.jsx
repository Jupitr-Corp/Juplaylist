import React from "react";
import "../css/ButtonLoading.css";
import MoonLoader from "react-spinners/MoonLoader";

function ButtonLoading(props) {
  // ---------- Props -------------
  const {
    text = "Click Me!",
    color = "#fff",
    backgroundColor = "#000",
    loading,
  } = props;

  // ------- State ------
  const [defLoading, setDefLoading] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  // ------- Functions ------
  const onClick = () => {
    if (loading === undefined) {
      setDefLoading(true);
    } else {
      setDefLoading(loading);
    }
  };

  const buttonBackground = () => {
    if (hover || defLoading) {
      return "#808080";
    } else {
      return backgroundColor;
    }
  };

  // ------------------ Effects ------------------

  React.useEffect(() => {
    if (loading === undefined) return;
    setDefLoading(loading);
  }, [loading]);

  // ------- Render ------
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={props.onClick || onClick}
      className="button-loading"
      style={{ backgroundColor: buttonBackground() }}
    >
      {defLoading ? (
        <MoonLoader
          size={15}
          color={color}
          loading={defLoading}
          speedMultiplier={0.5}
        />
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
}

export default ButtonLoading;
