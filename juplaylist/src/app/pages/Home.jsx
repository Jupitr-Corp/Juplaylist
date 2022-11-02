import React,{useState} from 'react';
import { FiUsers, FiShare } from "react-icons/fi";
import "../css/Home.css";


function Home(props) {

    const [participants, setParticipants] = useState(0); // TODO: get participants from database each time there is a new connection
    const [UID] = useState("EYD7D3"); // TODO: get UID from database

    const shareUrl = " Join our playlist at https://juplaylist.com/Join/" + UID + " !"; //TODO: choose url format

    let SmsRequest = "sms:?body=" + shareUrl;

    const addParticipant = () => {
        console.log(getMobileOS());
        setParticipants(participants + 1);
    }

    const removeParticipant = () => {
        setParticipants(participants - 1);
    }

    const resetParticipants = () => {
        setParticipants(0);
    }

    const copyToClipboard = () => {
        let platform = getMobileOS();
        SmsRequest = platform === "Android" ? "sms:?body=" + shareUrl : "sms:&body=" + shareUrl;
        navigator.clipboard.writeText(shareUrl);
    }


    const getMobileOS = () => {
        const ua = navigator.userAgent
        if (/android/i.test(ua)) {
          return "Android"
        }
        else if ((/iPad|iPhone|iPod/.test(ua)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) 
        {
          return "iOS"
        }
        return "Other"
      }


      


    return (
        <div className='home-header'>
            <div onClick={addParticipant} className='header-element participants'>
                <p>{participants}</p>
                <FiUsers className='home-header-icon'/>
            </div>
            <div className='header-element invite'>
                <a onClick={copyToClipboard} href={SmsRequest} className='invite-link'>
                    <p>Invite</p>
                    <FiShare className='home-header-icon'/>
                </a>
            </div>
        </div>
        );
}

export default Home;