import { Movie, MovieOriginalData } from "./types";

export function movieMapper(res: MovieOriginalData): Movie {
  return {
    id: res.id,
    title: res.title,
    description: res.overview,
    score: res.vote_average,
    posterUrl: res.poster_path,
    releaseYear: res.release_date.slice(0, 4),
    genres: res.genres && [...res.genres],
    runtime: res.runtime && res.runtime,
    tagline: res.tagline && res.tagline,
  };
}
