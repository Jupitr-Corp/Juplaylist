import React from "react";
import "../css/SearchList.css";
import { RequestContext } from "./RequestComponent";
import CustomToast from "../ux/Toast";
import { getContentDetails } from "../apis/youtube";
import moment from "moment";

function SearchList(props) {
  const { queue, setQueue, songLocked } = React.useContext(RequestContext);
  const { video, handleOnBlur } = props;
  const [userUid] = React.useState("1Dzfe8Ab"); // TODO get from db

  // -------- functions ------

  const handleGetDetails = (video) => {
    getContentDetails(video.id).then((response) => {
      const res = response.data.items[0].contentDetails;
      const details = {
        duration: moment.duration(res.duration).asSeconds(),
      };
      handleSuggest(video, details);
    });
  };

  const handleSuggest = (video, details) => {
    if (queue.length < 20) {
      for (let i = 0; i < queue.length; i++) {
        if (queue[i].id === video.id) {
          CustomToast.info("This video is already in the queue");
          handleOnBlur();
          return;
        }
      }
      let videoToBeAdded = {
        title: video.title,
        artist: video.channel,
        id: video.id,
        cover: video.cover,
        duration: details.duration,
        likes: [userUid],
        dislikes: [],
      };

      let newQueue = [...queue, videoToBeAdded];
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
    } else {
      CustomToast.info("Queue is full! Wait for the next song to be played.");
    }
    handleOnBlur();
  };

  // -------- render ---------
  return (
    <div
      className="searchlist"
      style={{
        display: video.length === 0 ? "none" : "flex",
      }}
    >
      <ul>
        {video.map((video) => (
          <li key={video.id}>
            <div className="searchlist-item-info">
              <span>{video.title}</span>
              <p>{video.channel}</p>
            </div>
            <button onClick={() => handleGetDetails(video)}>Suggest</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchList;
