import axios from "axios";
import ytbConfig from "../config/ytb.json";
import Toast from "../ux/Toast";

const keys = ytbConfig.keys;
let keyIndex = 0;

let youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 7,
    key: keys[keyIndex],
  },
});

export const get = (query, catchFunction) => {
  return youtube
    .get("/search", {
      params: {
        q: query,
        order: "viewCount",
        type: "video",
        videoDefinition: "high",
        regionCode: "FR",
        relevanceLanguage: "fr",
        videoSyndicated: "true",
      },
    })
    .catch((err) => {
      if (catchFunction) {
        catchFunction();
      } else {
        if (err.response.status === 403) {
          keyIndex++;
          if (keyIndex >= keys.length) {
            Toast.error("Toutes les clés sont épuisées");
            return;
          }
          youtube = axios.create({
            baseURL: "https://www.googleapis.com/youtube/v3",
            params: {
              part: "snippet",
              maxResults: 7,
              key: keys[keyIndex],
            },
          });
          return get(query);
        }
      }
    });
};
