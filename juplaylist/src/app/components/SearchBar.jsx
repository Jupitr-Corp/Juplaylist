import React from "react";

function SearchBar(props) {
  const [video, setVideo] = React.useState([]);
  const [query, setQuery] = React.useState("");

  const handleSubmit = async () => {
    // const response = await youtube.get("/search", {
    //   params: {
    //     q: query,
    //   },
    // });
    // setVideo(response.data.items);
  };

  // ------------------ Render ------------------

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        name="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSubmit();
        }}
      />
      <button
        onClick={() => {
          handleSubmit();
          setQuery("");
        }}
      >
        Search
      </button>
      <ul>
        {video.map((video) => (
          <li key={video.id.videoId}>{video.snippet.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
