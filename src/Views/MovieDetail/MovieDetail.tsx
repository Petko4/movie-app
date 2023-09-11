import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { API_KEY, BASE_API_URL } from "../../lib/constants";
import Score from "../../components/Score/Score";
import { movieMapper } from "../../lib/mappers";
import style from "./MovieDetail.module.css";
import { useContext } from "react";
import { LocalStorageContext } from "../../App";
import { Movie, MovieOriginalData, MovieStorageContext } from "../../lib/types";
import LinkButton from "../../components/LinkButton/LinkButton";

function MovieDetail() {
  const { addMovie } = useContext(LocalStorageContext) as MovieStorageContext;
  const { id } = useParams();
  const { data, isLoading, error } = useFetch<MovieOriginalData>(
    `${BASE_API_URL}/movie/${id}?${API_KEY}`
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.warn(error);
    return <p>Something went wrong...</p>;
  }

  let movie: Movie | null = null;

  if (data) {
    movie = movieMapper(data);
  }

  return (
    <>
      {movie && (
        <div className={style.movieDetail}>
          <div className={style.description}>
            <h2>
              {movie.title} ({movie.releaseYear})
            </h2>
            <p className={style.tagLine}>{movie.tagline}</p>
            <p>
              {movie.genres?.map((genre, index) => (
                <span key={genre.id}>
                  {index !== 0 ? " / " : ""}
                  {genre.name}
                </span>
              ))}
            </p>
            <p>{movie.description}</p>
            <p>Duration {movie.runtime} minutes.</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <LinkButton
                onClick={() => addMovie(movie as Movie)}
                name="Add movie into watchlist"
              />
              <div className={style.score}>
                <Score score={Math.round(movie.score)} />
              </div>
            </div>
          </div>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.posterUrl}`}
              alt={movie.title}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default MovieDetail;
