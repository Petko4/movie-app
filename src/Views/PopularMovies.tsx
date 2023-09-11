import { useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { MOVIES_BY_POPULARITY_URL } from "../lib/constants";
import MovieList from "../components/MovieList/MovieList";
import { movieMapper } from "../lib/mappers";
import MoreButton from "../components/MoreButton/MoreButton";
import { Movie, MovieStorageContext, MoviesOriginalData } from "../lib/types";
import { LocalStorageContext } from "../App";

function PopularMovies() {
  const { addMovie } = useContext(LocalStorageContext) as MovieStorageContext;
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Array<Movie>>([]);

  const { data, isLoading, error } = useFetch<MoviesOriginalData>(
    `${MOVIES_BY_POPULARITY_URL}&page=${page}`
  );

  useEffect(() => {
    if (data) {
      setMovies((prev) => [...prev, ...data.results.map(movieMapper)]);
    }
  }, [JSON.stringify(data)]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.warn(error);
    return <p>Something went wrong...</p>;
  }

  const handleClickButton = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      {data && (
        <MovieList moviesData={movies} onAction={addMovie} actionName="Add" />
      )}
      <MoreButton onClick={handleClickButton} />
    </>
  );
}

export default PopularMovies;
