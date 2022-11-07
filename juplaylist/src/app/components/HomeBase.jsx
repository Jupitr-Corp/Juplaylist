import React, { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import ToggleSwitch from "./ToggleSwitch";


function HomeBase(props) {
  const { participants, SmsRequest, platform, setLoading, shareUrl } = props;

  // ------- State ------
  const [isPlaylist, setIsPlaylist] = useState(true);

  // ------------------------  Functions  ------------------------------

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
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
      <ToggleSwitch playlist={isPlaylist} setPlaylist={setIsPlaylist} />
    </>

  );
}

export default HomeBase;
