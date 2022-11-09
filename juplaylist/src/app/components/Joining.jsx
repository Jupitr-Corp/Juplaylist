import React from "react";
import "../css/Joining.css";
import WomanSinging from "../assets/illustrations/joining-illu.png";
import ButtonLoading from "../ux/ButtonLoading";

function Joining(props) {
  // ------------- State -------------

  const [buttonLoading1, setButtonLoading1] = React.useState(false);
  const [buttonLoading2, setButtonLoading2] = React.useState(false);

  // ------------- Functions -------------
  const onClick1 = () => {
    if (buttonLoading2) return;
    setButtonLoading1(true);
  };

  /* this is done in order to not allow the user to click on the button
  while the other button is loading*/

  const onClick2 = () => {
    if (buttonLoading1) return;
    setButtonLoading2(true);
  };

  // ------------- Render -------------
  return (
    <div className="joining">
      <div className="header">
        <h2>Let the show begin by joining an event!</h2>
        <img src={WomanSinging} alt="a woman singing" />
      </div>
      <div className="event-field">
        <fieldset>
          <legend>Event UID</legend>
          <input type="text" maxLength={6} placeholder="Rejoins-nous!" />
        </fieldset>
        <ButtonLoading
          onClick={onClick1}
          text={"Join"}
          loading={buttonLoading1}
        />
      </div>
      <div className="separator">
        <hr></hr>
        <p>OR</p>
        <hr></hr>
      </div>
      <div className="create-field">
        <ButtonLoading
          onClick={onClick2}
          text={"Create an event"}
          loading={buttonLoading2}
        />
      </div>
    </div>
  );
}

export default Joining;
