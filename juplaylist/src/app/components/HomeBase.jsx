import React, { useState } from "react";
import HomeHeader from "./HomeHeader";
import ToggleSwitch from "./ToggleSwitch";
import PlaylistSide from "./PlaylistSide";
import SearchSide from "./SearchSide";
import "../css/Homebase.css";
import Toast from "../ux/Toast";

function HomeBase(props) {
  const { participants, SmsRequest, platform, setLoading, shareUrl } = props;

  // ------- State ------
  const [isPlaylist, setIsPlaylist] = useState(true);

  // ------------------------  Functions  ------------------------------

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    Toast.success("Link copied to clipboard!", {
      autoClose: 2000,
    });
  };

  // ------------------ Effects ------------------

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
          <SearchSide />
        )}
      </div>
    </>
  );
}

export default HomeBase;
