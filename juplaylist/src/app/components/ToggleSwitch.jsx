import React, { useState, useEffect } from "react";
import "../css/ToggleSwitch.css";

function ToggleSwitch(props) {
  const { playlist, setPlaylist } = props;

  // ------------------ States ------------------
  //
  const [countRender, setCountRender] = useState(0);

  // ------------------ Functions ------------------

  const bgClass = () => {
    if (playlist && countRender > 2) {
      // because of react strict mode, the first render is not counted : >2
      return "bg slide-left";
    }
    if (!playlist && countRender > 2) {
      return "bg slide-right";
    }
    return "bg";
  };

  // ------------------ Effects ------------------

  useEffect(() => {
    setCountRender((c) => c + 1);
  }, [playlist]);

  // ------------------ Render ------------------
  return (
    <div className="toggle-switch">
      <div className="switch">
        <div className={bgClass()} />
        <div className="left" onClick={() => setPlaylist(true)}>
          <span>Playlist</span>
        </div>
        <div className="right" onClick={() => setPlaylist(false)}>
          <span>Search</span>
        </div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
