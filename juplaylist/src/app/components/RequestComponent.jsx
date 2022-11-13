import React from "react";
import { get, set, getDatabase, ref, child } from "firebase/database";
import { app } from "../components/firebase-config";
import { ToastContainer, toast } from "react-toastify";

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
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export default function Request(props) {
  return (
    <>
      <ToastContainer
        limit={5}
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
      />
      {props.children}
    </>
  );
}
