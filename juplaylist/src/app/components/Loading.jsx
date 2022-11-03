import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import "../css/Loading.css";

function Loading(props) {
  return (
    <div className="loading">
      <ScaleLoader
        color={"black"}
        loading={true}
        size={200}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={1}
      />
    </div>
  );
}

export default Loading;
