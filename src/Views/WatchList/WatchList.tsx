import { useContext } from "react";
import { LocalStorageContext } from "../../App";
import MovieList from "../../components/MovieList/MovieList";

function WatchList() {
  const { movies, removeMovie } = useContext(LocalStorageContext);

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
