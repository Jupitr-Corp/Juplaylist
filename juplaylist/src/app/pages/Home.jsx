import React,{useState, useEffect} from 'react';
import "../css/Home.css";
import HomeHeader from "../components/HomeHeader";


function Home(props, {platform}) {


    // ------------------ State ------------------

    const [participants, setParticipants] = useState(0); // TODO: get participants from database each time there is a new connection
    const [UID] = useState("EYD7D3"); // TODO: get UID from database

    // ------------------ Variables ------------------

    const shareUrl = " Join our playlist at https://juplaylist.com/Join/" + UID + " !"; //TODO: choose url format

    const SmsRequest = platform === "Android" ? "sms:?body=" + shareUrl : "sms:&body=" + shareUrl;

    // ------- Functions ------

    const addParticipant = () => {
        setParticipants(participants + 1);
    }

    const removeParticipant = () => {
        setParticipants(participants - 1);
    }

    const resetParticipants = () => {
        setParticipants(0);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
    }

    // ------------------ Effects ------------------

    useEffect(() => {
        if(platform === 'undefined') {
            console.log("Platform is " + platform);

        }
        else {
            console.log("Platform is " + platform);
        }
    }, [platform]);

    // ------------------ Render ------------------

    return (
        <HomeHeader platform={platform} SmsRequest={SmsRequest} copyToClipboard={copyToClipboard} />
        );
}

export default Home;