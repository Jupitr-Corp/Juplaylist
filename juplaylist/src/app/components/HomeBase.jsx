import React, { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import ToggleSwitch from "./ToggleSwitch";
import PlaylistSide from "./PlaylistSide";
import "../css/Homebase.css";
import { toast, Slide } from "react-toastify";

function HomeBase(props) {
  const { participants, SmsRequest, platform, setLoading, shareUrl } = props;

  // ------- State ------
  const [isPlaylist, setIsPlaylist] = useState(true);

  // ------------------------  Functions  ------------------------------

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!", {
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_RIGHT,
      transition: Slide,
      role: "presentation",
    });
  };

  // ------------------ Effects ------------------

  useEffect(() => {
    if (
      (platform !== "Android" && platform !== "iOS" && platform !== "Other") ||
      SmsRequest === "undefined" ||
      participants === "undefined"
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [platform, participants, SmsRequest, setLoading]);

  // ------------------ Render ------------------

  return (
    <>
      <HomeHeader
        platform={platform}
        participants={participants}
        SmsRequest={SmsRequest}
        copyToClipboard={copyToClipboard}
      />
      <div className="home-body">
        <ToggleSwitch playlist={isPlaylist} setPlaylist={setIsPlaylist} />
        {isPlaylist ? (
          <PlaylistSide participants={participants} setLoading={setLoading} />
        ) : (
          <div className="home__side"></div>
        )}
      </div>
    </>
  );
}

export default HomeBase;
