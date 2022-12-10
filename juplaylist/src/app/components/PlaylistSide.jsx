import React, { useContext, useCallback } from "react";
import Queue from "./Queue";
import "../css/PlaylistSide.css";
import { RequestContext } from "./RequestComponent";

function PlaylistSide(props) {
  const { participants } = props;
  const {
    setLoading,
    queue,
    setQueue,
    songLocked,
    setSongLocked,
    nbvotes,
    setNbvotes,
    isPlaying,
    setIsPlaying,
    songTitle,
    setSongTitle,
    songArtist,
    setSongArtist,
    songCover,
    setSongCover,
    songDuration,
    setSongDuration,
    currentTime,
    setCurrentTime,
  } = useContext(RequestContext);

  // ------- State ------
  const [isAdmin] = React.useState(true); // TODO get from db
  const [asVoted, setAsVoted] = React.useState(false);

  // ------- Functions ------

  const handleVote = () => {
    if (!songCover) return;
    if (!asVoted) {
      setNbvotes(nbvotes + 1);
      setAsVoted(true);
    } else {
      setNbvotes(nbvotes - 1);
      setAsVoted(false);
    }
  };

  const handlePlay = () => {
    if (!songCover) return;
    setIsPlaying(!isPlaying);
  };

  const getVote = () => {
    if (nbvotes !== 0 && participants !== 0) {
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

  const handleNext = useCallback(() => {
    if (queue.length === 0) {
      setSongTitle("It's calm here...");
      setSongArtist("Add some songs!");
      setSongCover(undefined);
      setIsPlaying(false);
    } else {
      setSongTitle(queue[0].title);
      setSongArtist(queue[0].artist);
      setSongCover(queue[0].cover);
      setSongDuration(queue[0].duration);
      setQueue(queue.slice(1));
      setSongLocked(false);
      setCurrentTime(0); // TODO see from where we get the info
      setIsPlaying(true);
    }
  }, [
    queue,
    setSongTitle,
    setSongArtist,
    setSongCover,
    setSongDuration,
    setQueue,
    setSongLocked,
    setCurrentTime,
    setIsPlaying,
  ]);

  const handleLock = useCallback(() => {
    setSongLocked(!songLocked);
  }, [songLocked, setSongLocked]);

  // ------- Effects --------

  // manage loading
  React.useEffect(() => {
    if (
      isAdmin === undefined ||
      participants === undefined ||
      queue === undefined ||
      nbvotes === undefined ||
      isPlaying === undefined
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isAdmin, participants, queue, nbvotes, isPlaying, setLoading]);

  // function to skip the current song
  React.useEffect(() => {
    if (nbvotes > participants * 0.7) {
      handleNext();
      setNbvotes(0);
      setAsVoted(false);
    }
  }, [nbvotes, participants, setNbvotes, setAsVoted, handleNext]);

  // function that handles the voting of the next song
  React.useEffect(() => {
    if (!songLocked && currentTime >= songDuration * 0.8) {
      handleLock();
    }
  }, [currentTime, songDuration, songLocked, handleLock]);

  // handles the playing of the song
  React.useEffect(() => {
    const handleFirstPlay = () => {
      if (queue.length > 0 && !songCover) {
        setSongTitle(queue[0].title);
        setSongArtist(queue[0].artist);
        setSongCover(queue[0].cover);
        setSongDuration(queue[0].duration);
        setIsPlaying(true);
        setQueue(queue.slice(1));
      } else if (queue.length === 0 && !songCover) {
        setSongTitle("It's calm here...");
        setSongArtist("ADD SOME SONGS");
        setSongCover(undefined);
        setSongDuration(undefined);
        setIsPlaying(false);
      }
    };
    handleFirstPlay();
  }, [
    queue,
    songCover,
    setSongTitle,
    setSongArtist,
    setSongCover,
    setSongDuration,
    setIsPlaying,
    setQueue,
  ]);

  // handles the currentTime increment
  React.useEffect(() => {
    let interval;
    if (isPlaying) {
      if (currentTime >= songDuration) {
        handleNext();
      } else {
        interval = setInterval(() => {
          setCurrentTime(currentTime + 1);
        }, 1000);
      }
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, handleNext, setCurrentTime, songDuration]);

  // ------- Render ------
  return (
    <div className="playlist-container">
      <section className="player-container">
        <div className="current-song">
          <div className="cover-container">
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
          </div>

          <div className="song-infos">
            <h4 title={songTitle}>{songTitle}</h4>
            <h5>{songArtist}</h5>
          </div>
        </div>
        <div className="player-controls">
          <div
            style={{
              display: isAdmin ? "flex" : "none",
            }}
            onClick={handlePlay}
            className="player-button"
          >
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </div>
          <div className="player-button" onClick={handleVote}>
            <span>{handleVoteText()}</span>
            <span style={{ display: nbvotes === 0 ? "none" : "block" }}>
              {getVote()}
            </span>
          </div>
        </div>
      </section>
      <Queue queue={queue} setQueue={setQueue} songLocked={songLocked} />
    </div>
  );
}

export default PlaylistSide;
