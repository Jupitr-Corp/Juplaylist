import axios from "axios";

const KEY = "AIzaSyATB98i9jyiS9KW5toULnm_AQWBFJX267Q";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY,
  },
});
