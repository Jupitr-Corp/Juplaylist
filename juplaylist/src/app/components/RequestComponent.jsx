import React, { createContext } from "react";
import { get, set, getDatabase, ref, child } from "firebase/database";
import { app } from "../components/firebase-config";
import { ToastContainer, toast, Slide, Bounce } from "react-toastify";

export const dbRef = getDatabase(app);

export const getRef = (path) => {
  return ref(dbRef, path);
};

export const getChil = (path) => {
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
  //Here make some thing about errors issues
  toast.error(error.message, {
    theme: "colored",
    transition: Bounce,
    autoClose: false,
  });
};

export const RequestContext = createContext();

export default function Request(props) {
  let [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <RequestContext.Provider value={{ loading, setLoading }}>
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
