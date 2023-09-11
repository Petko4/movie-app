import { useContext } from "react";
import { LocalStorageContext } from "../../App";
import MovieList from "../../components/MovieList/MovieList";
import { MovieStorageContext } from "../../lib/types";

function WatchList() {
  const { movies, removeMovie } = useContext(
    LocalStorageContext
  ) as MovieStorageContext;

  return (
    <>
      <MovieList
        moviesData={movies}
        onAction={removeMovie}
        actionName="Remove"
      />
    </>
  );
}

export default WatchList;
