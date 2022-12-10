import React, { createContext } from "react";
import { get, set, getDatabase, ref, child } from "firebase/database";
import { app } from "../components/firebase-config";
import { ToastContainer, toast, Slide, Bounce } from "react-toastify";

export const dbRef = getDatabase(app);

export const getRef = (path) => {
  return ref(dbRef, path);
};

export const getChild = (path) => {
  return child(dbRef, path);
};

export const getData = (path, resultFunction) => {
  get(ref(dbRef, path))
    .then((result) => {
      if (result.exists()) {
        goodIssue();
        resultFunction(result.val());
      } else resultFunction(null);
    })
    .catch((error) => errorIssue(error));
};

export const getRefData = (ref, resultFunction) => {
  get(ref)
    .then((result) => {
      if (result.exists()) {
        goodIssue();
        resultFunction(result.val());
      } else resultFunction(null);
    })
    .catch((error) => errorIssue(error));
};

export const setData = (path, resultFunction) => {
  set(ref(dbRef, path))
    .then((result) => {
      if (result.exists()) {
        goodIssue();
        resultFunction(result.val());
      } else resultFunction(null);
    })
    .catch((error) => errorIssue(error));
};

export const setRefData = (ref, resultFunction) => {
  set(ref)
    .then((result) => {
      if (result.exists()) {
        goodIssue();
        resultFunction(result.val());
      } else resultFunction(null);
    })
    .catch((error) => errorIssue(error));
};

const goodIssue = () => {
  console.log("Good issue");
};

const errorIssue = (error) => {
  toast.error(error.message, {
    theme: "colored",
    transition: Bounce,
    autoClose: false,
  });
};

export const RequestContext = createContext();

export default function Request(props) {
  // ------------------ States ------------------

  const [loading, setLoading] = React.useState(true);
  const [queue, setQueue] = React.useState([]); // TODO get queue from db
  const [songLocked, setSongLocked] = React.useState(false);
  const [countRender, setCountRender] = React.useState(0);
  const [nbvotes, setNbvotes] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [songTitle, setSongTitle] = React.useState(undefined); //TODO get info from db
  const [songArtist, setSongArtist] = React.useState(undefined); //TODO get info from db
  const [songCover, setSongCover] = React.useState(undefined); //TODO get info from db
  const [songDuration, setSongDuration] = React.useState(undefined); //TODO get info from db
  const [currentTime, setCurrentTime] = React.useState(0); // TODO get info from db
  const [isPlaylist, setIsPlaylist] = React.useState(true);

  // React.useEffect(() => {
  //   console.log(loading);
  // }, [loading]);

  // React.useEffect(() => {
  //   console.log(queue);
  // }, [queue]);

  // ------------------ Functions ------------------

  // ------------------ Render ------------------

  return (
    <RequestContext.Provider
      value={{
        loading,
        setLoading,
        queue,
        setQueue,
        songLocked,
        setSongLocked,
        countRender,
        setCountRender,
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
        isPlaylist,
        setIsPlaylist,
      }}
    >
      <ToastContainer
        limit={5}
        autoClose={3000}
        hideProgressBar={false}
        transition={Slide}
        closeOnClick
        pauseOnHover
        draggable
        position="bottom-right"
        theme="light"
      />

      {props.children}
    </RequestContext.Provider>
  );
}
