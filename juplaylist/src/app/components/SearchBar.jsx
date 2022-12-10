import React from "react";
import "../css/SearchBar.css";
import { FiSearch } from "react-icons/fi";
import SearchList from "./SearchList";

function SearchBar(props) {
  const {
    handleQuery,
    video,
    setVideo,
    query,
    setQuery,
    searched,
    setSearched,
  } = props;

  // ------------------------  State  ------------------------------

  const [lastQuery, setLastQuery] = React.useState("");
  const [focus, setFocus] = React.useState(false);

  // ------------  Functions  -----------------

  const handleButtonClick = () => {
    if (query === "") {
      handleOnBlur();
      return;
    }
    if (query === lastQuery) {
      return;
    }
    setLastQuery(query);
    handleQuery(query, true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
    if (event.key === "Escape") {
      handleOnBlur();
    }
  };

  const handleOnBlur = () => {
    setFocus(false);
    setVideo([]);
    setSearched(false);
    setQuery("");
    document.getElementById("search").blur();
  };

  const useOutsideClick = (callback) => {
    const ref = React.useRef();

    React.useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener("click", handleClick);

      return () => {
        document.removeEventListener("click", handleClick);
      };
    }, [ref, callback]);

    return ref;
  };

  const ref = useOutsideClick(handleOnBlur);

  // -------------- Effects --------------

  // function to remove search if query is deleted
  React.useEffect(() => {
    if (query === "") {
      setLastQuery("");
      setSearched(false);
      setVideo([]);
    }
  }, [query, setVideo, setSearched]);

  // ------------------ Render ------------------

  return (
    <div className="search-input-content">
      <div ref={ref} className="search-input-ref">
        <div
          className="search-input"
          style={{
            borderRadius: searched ? " 25px 25px 0 0" : "25px",
            boxShadow: focus ? " 0 5px 10px 5px rgba(0, 0, 0, 0.06)" : "none",
          }}
        >
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Drake, Bad Habit, Elvis..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocus(true)}
          />
          <button
            onClick={() => {
              setFocus(false);
              handleButtonClick();
            }}
          >
            <FiSearch size={20} color={"#808080"} />
          </button>
        </div>
        {video !== [] && (
          <SearchList video={video} handleOnBlur={handleOnBlur} />
        )}
      </div>
    </div>
  );
}

export default SearchBar;
