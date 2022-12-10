import React, { useCallback } from "react";
import SearchBar from "./SearchBar";
import { get } from "../apis/youtube";
import CustomToast from "../ux/Toast";
import "../css/SearchSide.css";

// TODO: make suggestions if i want
function SearchSide(props) {
  // ----- states -------
  const [searched, setSearched] = React.useState(false);
  const [video, setVideo] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [suggestions] = React.useState([]);

  // ----- functions ------

  const handleQuery = useCallback(
    (query, bysearch) => {
      get(query).then((response) => {
        let responseVideo = response.data.items;
        let res = [];
        for (let i = 0; i < responseVideo.length; i++) {
          let videoId = responseVideo[i].id.videoId;
          let videoTitle = responseVideo[i].snippet.title;

          videoTitle = videoTitle.replace(/&quot;/g, '"');
          videoTitle = videoTitle.replace(/&#39;/g, "'");
          videoTitle = videoTitle.replace(/&amp;/g, "&");
          videoTitle = videoTitle.replace(/&lt;/g, "<");
          videoTitle = videoTitle.replace(/&gt;/g, ">");
          videoTitle = videoTitle.replace(/&nbsp;/g, " ");

          let uvideo = {
            id: videoId,
            title: videoTitle,
            channel: responseVideo[i].snippet.channelTitle,
            cover: responseVideo[i].snippet.thumbnails.high.url,
          };

          res.push(uvideo);
        }
        if (bysearch && res.length === 0) {
          CustomToast.warning("No results found for your research!");
          setQuery("");
        } else if (bysearch) {
          setSearched(true);
          setVideo(res);
          return;
        }
      });
    },
    [setSearched, setVideo, setQuery]
  );

  // ------- effects ------

  // ------- render -------

  return (
    <div
      style={{
        width: "100%",
        padding: "0 30px",
      }}
    >
      <SearchBar
        handleQuery={handleQuery}
        searched={searched}
        setSearched={setSearched}
        query={query}
        setQuery={setQuery}
        video={video}
        setVideo={setVideo}
      />
      <div className="suggestions-container">
        <h4>
          No idea because you may have un peu forcé sur la gnôle?
          <br />
          {/* Take a look at our propositions below! */}
          Cheh.
        </h4>
        <ul className="suggestions">
          {suggestions.map((suggest) => (
            <li key={suggest.id}>
              <span>{suggest.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchSide;
