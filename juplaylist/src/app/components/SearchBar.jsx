import React from "react";
import { get } from "../apis/youtube";

function SearchBar(props) {
  // ------------------------  State  ------------------------------
  const [video, setVideo] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [lastQuery, setLastQuery] = React.useState("");

  // ------------  Functions  -----------------

  const handleSubmit = () => {
    if (query === lastQuery) {
      return;
    }
    setLastQuery(query);

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
        };

        res.push(uvideo);
      }
      setVideo(res);
    });
  };

  // React.useEffect(() => {
  // const timer = setTimeout(() => {
  //   if (query) {
  //     console.log("useEffect");
  //     handleSubmit();
  //   }
  // }, 1500);
  // return () => clearTimeout(timer);
  // }, [query]);

  // -------------- Effects --------------

  React.useEffect(() => {
    if (query === "") {
      setVideo([]);
    }
  }, [query, setVideo]);

  // ------------------ Render ------------------

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        name="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={() => {
          if (query === "") {
            return;
          }
          handleSubmit();
        }}
      >
        Search
      </button>
      <ul>
        {video !== [] &&
          video.map((video) => <li key={video.id}>{video.title}</li>)}
      </ul>
    </div>
  );
}

export default SearchBar;
