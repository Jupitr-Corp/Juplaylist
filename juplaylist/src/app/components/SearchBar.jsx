import React from "react";
import "../css/SearchBar.css";
import { get } from "../apis/youtube";
import { FiSearch } from "react-icons/fi";
import CustomToast from "../ux/Toast";

function SearchBar(props) {
  // ------------------------  State  ------------------------------
  const [video, setVideo] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [lastQuery, setLastQuery] = React.useState("");

  // ------------  Functions  -----------------

  const handleQuery = () => {
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

  const handleButtonClick = () => {
    if (query === "") {
      CustomToast.info("Please search for something"); // TODO remove after developing you dumbass
      return;
    }
    handleQuery();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };

  // -------------- Effects --------------

  React.useEffect(() => {
    if (query === "") {
      setVideo([]);
    }
  }, [query, setVideo]);

  // React.useEffect(() => {
  // const timer = setTimeout(() => {
  //   if (query) {
  //     console.log("useEffect");
  //     handleSubmit();
  //   }
  // }, 1500);
  // return () => clearTimeout(timer);
  // }, [query]);

  // ------------------ Render ------------------

  return (
    <div>
      <div className="search-input">
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Drake, Bad Habit, Elvis..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleButtonClick}>
          <FiSearch size={20} color={"#808080"} />
        </button>
      </div>
      <ul>
        {video !== [] &&
          video.map((video) => <li key={video.id}>{video.title}</li>)}
      </ul>
    </div>
  );
}

export default SearchBar;
