import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";

import style from "./Search.module.css";
import { API_KEY, BASE_API_URL } from "../../lib/constants";
import { movieMapper } from "../../lib/mappers";
import { MovieOriginalData } from "../../lib/types";

function Search() {
  const [value, setValue] = useState("");
  const [url, setUrl] = useState("");
  const timeoutRef = useRef<number | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const [showData, setShowData] = useState(true);
  const isFirstRender = useRef(true);

  const { data } = useFetch(url);

  // 1 sec after stop typing update url and this will trigger data fetch
  useEffect(() => {
    // if (value !== "") {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      if (timeoutRef?.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setUrl(`${BASE_API_URL}/search/movie?query=${value}&${API_KEY}`);
      }, 1000);
    }

    // }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);

  //hide dropdown  when user click out of Search component
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowData(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <div className={style.search} ref={searchRef}>
      <input
        onFocus={() => setShowData(true)}
        onChange={handleInputChange}
        value={value}
        type="text"
        name="search"
        placeholder="Search"
      />
      {showData && data && data.results && <ul>{SearchList(data.results)}</ul>}
    </div>
  );
}

export default Search;

function SearchList(results: Array<MovieOriginalData>) {
  return results.map(movieMapper).map((movie) => (
    <li key={movie.id}>
      <Link to={`/detail/${movie.id}`}>
        {movie.title} {movie.releaseYear && "(" + movie.releaseYear + ")"}
      </Link>
    </li>
  ));
}
