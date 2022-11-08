import React, { useState } from "react";
import "../css/Home.css";
import { FiUsers, FiShare } from "react-icons/fi";
import Jupop from "../ux/Jupop";

function HomeHeader(props) {
  const { participants, SmsRequest, copyToClipboard, platform } = props;

  // ------------------ States ------------------

  const [showPop, setShowPop] = useState("hidden");
  // ------------------ Effects ------------------

  // ------------------ Render ------------------

  return (
    <div className="home-header">
      <div className="header-element participants">
        <p>{participants}</p>
        <FiUsers className="home-header-icon" />
      </div>
      <div
        className="header-element invite"
        onClick={() => {
          setShowPop("visible");
        }}
      >
        {(() => {
          if (platform === "Android") {
            return (
              <a
                onClick={copyToClipboard}
                href={SmsRequest}
                className="invite-link"
              >
                <p>Invite</p>
                <FiShare className="home-header-icon" />
              </a>
            );
          } else if (platform === "iOS") {
            return (
              <a
                onClick={copyToClipboard}
                href={SmsRequest}
                className="invite-link"
              >
                <p>Invite</p>
                <FiShare className="home-header-icon" />
              </a>
            );
          } else {
            return (
              <div onClick={copyToClipboard} className="invite-link">
                <p>Invite</p>
                <FiShare className="home-header-icon" />
              </div>
            );
          }
        })()}
      </div>
      <Jupop
        message="UID copied to clipboard!"
        color="white"
        backgroundColor="#0F730C"
        visibility={showPop}
        setVisibility={setShowPop}
      />
    </div>
  );
}

export default HomeHeader;
