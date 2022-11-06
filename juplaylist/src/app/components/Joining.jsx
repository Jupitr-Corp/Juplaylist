import React from "react";
import "../css/Joining.css";
import WomanSinging from "../assets/illustrations/joining-illu.png";

function Joining(props) {
  return (
    <div className="joining">
      <div className="header">
        <h2>Let the show begin by joining an event!</h2>
        <img src={WomanSinging} alt="a woman singing" />
      </div>
      <div className="event-field">
        <fieldset>
          <legend>Event UID</legend>
          <input type="tel" maxLength={10} placeholder="Rejoins-nous!" />
        </fieldset>
        <button>Join</button>
      </div>
      <div className="separator">
        <hr></hr>
        <p>OR</p>
        <hr></hr>
      </div>
      <div className="create-field">
        <button>Create an event</button>
      </div>
    </div>
  );
}

export default Joining;
