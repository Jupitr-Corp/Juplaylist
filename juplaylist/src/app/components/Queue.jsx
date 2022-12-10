import React from "react";
import "../css/Queue.css";
import SleepSvg from "../assets/illustrations/sleep.svg";
import { FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";

function Queue(props) {
  const { queue, setQueue, songLocked } = props;
  // ------- State ------
  const [userId] = React.useState("1Dzfe8Ab"); // TODO get from db

  // ------- Functions ------

  const handleVote = (index, vote) => {
    const newQueue = [...queue];

    if (vote === "up") {
      if (newQueue[index].likes.includes(userId)) {
        newQueue[index].likes = newQueue[index].likes.filter(
          (id) => id !== userId
        );
      } else {
        newQueue[index].likes.push(userId);
        newQueue[index].dislikes = newQueue[index].dislikes.filter(
          (id) => id !== userId
        );
      }
    } else if (vote === "down") {
      if (newQueue[index].dislikes.includes(userId)) {
        newQueue[index].dislikes = newQueue[index].dislikes.filter(
          (id) => id !== userId
        );
      } else {
        newQueue[index].dislikes.push(userId);
        newQueue[index].likes = newQueue[index].likes.filter(
          (id) => id !== userId
        );
      }
    }
    let firstVal;

    if (songLocked) {
      firstVal = newQueue.shift();
    }
    newQueue.sort((a, b) => {
      return (
        b.likes.length -
        a.likes.length -
        (b.dislikes.length - a.dislikes.length)
      );
    });
    if (firstVal) newQueue.unshift(firstVal);
    setQueue(newQueue);
  };

  // ------- Effects ------

  // ------- Render ------

  const renderQueue = () => {
    if (queue.length <= 1) {
      return (
        <div className="queue-empty">
          <img src={SleepSvg} alt="sleeping creature" />
          <p>No song in the queue</p>
        </div>
      );
    }
    let queueList = [];
    for (let i = 1; i < queue.length; i++) {
      queueList.push(
        <div className="queue-item" key={i}>
          <div className="queue-item-infos">
            <div className="queue-image-container">
              <img src={queue[i].cover} alt="cover" />
            </div>
            <div className="queue-item-infos-text">
              <h4 className="queue-item-title">{queue[i].title}</h4>
              <h5 className="queue-item-artist">{queue[i].artist}</h5>
            </div>
          </div>
          <div className="queue-item-votes">
            <FiArrowUpCircle
              size={25}
              onClick={() => {
                handleVote(i, "up");
              }}
              color={queue[i].likes.includes(userId) ? "#000" : "#808080"}
            />
            <span className="queue-item-votes-number">
              {queue[i].likes.length}
            </span>
          </div>
          <div className="queue-item-votes">
            <FiArrowDownCircle
              size={25}
              onClick={() => {
                handleVote(i, "down");
              }}
              color={queue[i].dislikes.includes(userId) ? "#000" : "#808080"}
            />
            <span className="queue-item-votes-number">
              {queue[i].dislikes.length}
            </span>
          </div>
        </div>
      );
    }
    return queueList;
  };

  return (
    <div className="queue">
      <section className="next-container">
        {queue.length <= 0 && <p>No song to be played</p>}
        {queue.length > 0 && (
          <>
            <div className="queue-image-container">
              <img src={queue[0].cover} alt="music cover" />
            </div>
            <div className="next-info">
              <p>{queue[0].title}</p>
              <h6>{queue[0].artist}</h6>
            </div>
            {(!songLocked && (
              <div className="next-votes">
                <div className="queue-item-votes">
                  <FiArrowUpCircle
                    size={25}
                    onClick={() => {
                      handleVote(0, "up");
                    }}
                    color={queue[0].likes.includes(userId) ? "#000" : "#808080"}
                  />
                  <span className="queue-item-votes-number">
                    {queue[0].likes.length}
                  </span>
                </div>
                <div className="queue-item-votes">
                  <FiArrowDownCircle
                    size={25}
                    onClick={() => {
                      handleVote(0, "down");
                    }}
                    color={
                      queue[0].dislikes.includes(userId) ? "#000" : "#808080"
                    }
                  />
                  <span className="queue-item-votes-number">
                    {queue[0].dislikes.length}
                  </span>
                </div>
              </div>
            )) || <p>Coming next</p>}
          </>
        )}
      </section>

      <section className="queue-container">
        <div className="queue-gradient" />
        {renderQueue()}
      </section>
    </div>
  );
}

export default Queue;
