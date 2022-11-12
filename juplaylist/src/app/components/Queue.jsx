import React from "react";
import "../css/Queue.css";
import SleepSvg from "../assets/illustrations/sleep.svg";
import { FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";

function Queue(props) {
  const { queue, setQueue } = props;

  // ------- State ------
  const [userId] = React.useState("5f9f9f9f9f9f9f9f9f9f9f9f"); // TODO get from db
  // ------- Functions ------

  // TODO BIG, handle the moment where the next song is locked and
  //no votes will be taken into account

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
    newQueue.sort((a, b) => {
      return (
        b.likes.length -
        a.likes.length -
        (b.dislikes.length - a.dislikes.length)
      );
    });

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
            <img src={queue[i].cover} alt="cover" />
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
        {(queue.length > 0 && <p>Next</p>) || <p>No song to pe played</p>}
        {queue.length > 0 && (
          <>
            <img src={queue[0].cover} alt="music cover" />
            <div className="next-info">
              <p>{queue[0].title}</p>
              <h6>{queue[0].artist}</h6>
              {/* TODO add buttons to vote (like, dislike) while the next song is not locked */}
            </div>
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
