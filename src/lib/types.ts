export type Movie = {
  id: number;
  title: string;
  description: string;
  score: number;
  posterUrl: string;
  releaseYear: string;
  genres?: [{ id: number; name: string }];
  runtime?: number;
  tagline?: string;
};

export type MovieOriginalData = {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
  runtime?: number;
  tagline?: string;
  genres?: [
    {
      id: number;
      name: string;
    }
  ];
};
