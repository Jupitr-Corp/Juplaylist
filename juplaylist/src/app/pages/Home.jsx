import React, { useState, useEffect } from "react";
import "../css/Home.css";
import HomeHeader from "../components/HomeHeader";
import Loading from "../components/Loading";
import Joining from "../components/Joining";

function Home(props) {
  // ------------------ State ------------------

  const [participants] = useState(0); // TODO: get participants from database each time there is a new connection
  const [UID] = useState("EYD7D3"); // TODO: get UID from database
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState(null);
  const [SmsRequest, setSmsRequest] = useState(null);

  // ------------------ Variables ------------------

  const shareUrl =
    " Join our playlist at https://juplaylist.com/Join/" + UID + " !"; //TODO: choose url format

  // ------- Functions ------
  // const addParticipant = () => {
  //   setParticipants(participants + 1);
  // };

  // const removeParticipant = () => {
  //   setParticipants(participants - 1);
  // };

  // const resetParticipants = () => {
  //   setParticipants(0);
  // };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  const getOs = () => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) {
      return "Android";
    } else if (
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    ) {
      return "iOS";
    }
    return "Other";
  };

  // ------------------ Effects ------------------

  useEffect(() => {
    setPlatform(getOs());
    setSmsRequest(
      platform === "Android" ? "sms:?body=" + shareUrl : "sms:&body=" + shareUrl
    );
  }, [setPlatform, setSmsRequest, platform, shareUrl]);

  useEffect(() => {
    if (platform === undefined) return;

    if (
      (platform !== "Android" && platform !== "iOS" && platform !== "Other") ||
      SmsRequest === "undefined" ||
      participants === "undefined"
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [platform, SmsRequest, participants]);

  // ------------------ Render ------------------

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Joining />
      {/* <HomeHeader
        setLoading={setLoading}
        platform={platform}
        participants={participants}
        SmsRequest={SmsRequest}
        copyToClipboard={copyToClipboard}
      /> */}
    </>
  );
}

export default Home;
