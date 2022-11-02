import React,{useEffect} from 'react';
import "../css/Home.css";
import { FiUsers, FiShare } from "react-icons/fi";


function HomeHeader(props, {platform, participants, SmsRequest, copyToClipboard}) {


// ------------------ Effects ------------------


// ------------------ Render ------------------

    return(
        <div className='home-header'>
            <div className='header-element participants'>
                <p>{participants}</p>
                <FiUsers className='home-header-icon'/>
            </div>
            <div className='header-element invite'>
                {(() => {
                    if (platform === "Android") {
                        return (
                            <a onClick={copyToClipboard} href={SmsRequest} className='invite-link'>
                                <p>Invite</p>
                                <FiShare className='home-header-icon'/>
                            </a>
                        );
                    }
                    else if (platform === "iOS") {
                        return (
                            <a onClick={copyToClipboard} href={SmsRequest} className='invite-link'>
                                <p>Invite</p>
                                <FiShare className='home-header-icon'/>
                            </a>
                        );
                    }
                    else {
                        return (
                            <div onClick={copyToClipboard} className='invite-link'>
                                <p>Invite</p>
                                <FiShare className='home-header-icon'/>
                            </div>
                        );
                    }
                })()}
            </div>
        </div>

    )
}

export default HomeHeader;