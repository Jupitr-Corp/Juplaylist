import React, { useState } from "react";
import "../css/ToggleSwitch.css";
function ToggleSwitch(props) {
  // ------------------ States ------------------
  const [onPlaylist, setOnPlaylist] = useState(true);

  // ------------------ Effects ------------------

  // ------------------ Render ------------------
  return (
    <div className="toggle-switch">
      <div className="switch">
        <div
          onClick={() => setOnPlaylist(true)}
          className={onPlaylist ? "left active" : "left"}
        >
          <span>Playlist</span>
        </div>
        <div
          onClick={() => setOnPlaylist(false)}
          className={onPlaylist ? "right" : "right active"}
        >
          <span>Search</span>
        </div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
