import React, { useContext } from "react";
import Queue from "./Queue";
import "../css/PlaylistSide.css";
import { RequestContext } from "./RequestComponent";

function PlaylistSide(props) {
  const { participants } = props;
  const { setLoading } = useContext(RequestContext);
  // ------- State ------
  const [isAdmin] = React.useState(true); // TODO get from db
  const [nbvotes, setNbvotes] = React.useState(0);
  const [asVoted, setAsVoted] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [songTitle, setSongTitle] = React.useState("I wanna be yours"); //TODO get info from db
  const [songArtist, setSongArtist] = React.useState("Artic Monkeys"); //TODO get info from db
  const [songCover, setSongCover] = React.useState("./covers/cover.webp"); //TODO get info from db
  const [queue, setQueue] = React.useState([
    {
      title: "yes",
      artist: "Artic Monkeys",
      cover: "./covers/cover2.webp",
      likes: [],
      dislikes: [],
    },
    {
      title: "yes",
      artist: "Artic Monkeys",
      cover: "./covers/cover2.webp",
      likes: [],
      dislikes: [],
    },
    {
      title: "yes",
      artist: "Artic Monkeys",
      cover: "./covers/cover2.webp",
      likes: [],
      dislikes: [],
    },
    {
      title: "A COLORS SHOW",
      artist: "BB Jacques",
      cover: "./covers/cover.webp",
      likes: [],
      dislikes: [],
    },
    {
      title: "yes",
      artist: "Artic Monkeys",
      cover: "./covers/cover2.webp",
      likes: [],
      dislikes: [],
    },
    {
      title: "yes",
      artist: "Artic Monkeys",
      cover: "./covers/cover2.webp",
      likes: [],
      dislikes: [],
    },
  ]);

  // ------- Functions ------

  const handleVote = () => {
    if (!asVoted) {
      setNbvotes(nbvotes + 1);
      setAsVoted(true);
    } else {
      setNbvotes(nbvotes - 1);
      setAsVoted(false);
    }
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const getVote = () => {
    if (nbvotes !== 0) {
      return nbvotes + "/" + participants;
    }
  };

  const handleVoteText = () => {
    if (asVoted) {
      return "Unvote Skip";
    } else {
      return "Vote Skip";
    }
  };

  const handleNext = () => {
    if (queue.length === 0) {
      setSongTitle("It's calm here...");
      setSongArtist("Add some songs!");
      setSongCover("");
    } else {
      setSongTitle(queue[0].title);
      setSongArtist(queue[0].artist);
      setSongCover(queue[0].cover);
      setQueue(queue.slice(1));
    }
  };

  // ------- Effects --------

  React.useEffect(() => {
    if (
      isAdmin === undefined ||
      participants === undefined ||
      queue === undefined ||
      nbvotes === undefined ||
      isPlaying === undefined ||
      songTitle === undefined ||
      songArtist === undefined ||
      songCover === undefined
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [
    isAdmin,
    participants,
    queue,
    nbvotes,
    isPlaying,
    songTitle,
    songArtist,
    songCover,
    setLoading,
  ]);

  React.useEffect(() => {
    if (nbvotes > participants * 0.7) {
      handleNext();
      setNbvotes(0);
      setAsVoted(false);
    }
  }, [nbvotes, participants, setNbvotes, setAsVoted]);

  // ------- Render ------
  return (
    <div className="playlist-container">
      <section className="player-container">
        <div className="current-song">
          <div className="cover-song">
            <img
              src={songCover || ""}
              alt="song cover"
              style={{
                animation: isPlaying ? "4s linear infinite rotate" : "none",
                opacity: isPlaying ? "1" : "0.5",
              }}
            />
          </div>
          <div className="song-infos">
            <h4>{songTitle}</h4>
            <h5>{songArtist}</h5>
          </div>
        </div>
        <div className="player-controls">
          <div
            style={{
              display: isAdmin ? "flex" : "none",
            }}
            onClick={songCover !== "" ? handlePlay : null}
            className="player-button"
          >
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </div>
          <div
            className="player-button"
            onClick={songCover !== "" ? handleVote : null}
          >
            <span>{handleVoteText()}</span>
            <span style={{ display: nbvotes === 0 ? "none" : "block" }}>
              {getVote()}
            </span>
          </div>
        </div>
      </section>
      <Queue queue={queue} setQueue={setQueue} />
    </div>
  );
}

export default PlaylistSide;
