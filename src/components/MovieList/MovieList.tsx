import { Movie } from "../../lib/types";
import MovieCard from "../MovieCard/MovieCard";
import style from "./MovieList.module.css";

type MovieListProps = {
  moviesData: Array<Movie>;
  onAction: (movie: Movie) => void;
  actionName: string;
};

function MovieList({ moviesData, onAction, actionName }: MovieListProps) {
  return (
    <div className={style.moviesList}>
      {moviesData.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          image={"https://image.tmdb.org/t/p/w500" + movie.posterUrl}
          title={movie.title}
          score={movie.score}
          description={movie.description}
          onAction={onAction}
          actionName={actionName}
          releaseYear={movie.releaseYear}
        />
      ))}
    </div>
  );
}

export default MovieList;
