import "./App.css";
import { Routes, Route } from "react-router-dom";
import PopularMovies from "./Views/PopularMovies";
import NotFound from "./Views/NotFound";
import MovieDetail from "./Views/MovieDetail/MovieDetail";
import Navigation from "./components/Navigation/Navigation";
import WatchList from "./Views/WatchList/WatchList";
import { createContext } from "react";
import { Movie, MovieStorageContext } from "./lib/types";
import useLocalStorage from "./hooks/useLocalStorage";

export const LocalStorageContext = createContext<MovieStorageContext | null>(
  null
);

function App() {
  const [movies, setMovies] = useLocalStorage<Array<Movie>>("movie_app", []);

  function addMovie(movie: Movie) {
    setMovies((prev) => {
      if (prev.find((prevMovie) => prevMovie.id === movie.id)) return [...prev];
      return [...prev, movie];
    });
  }

  function removeMovie(movie: Movie) {
    setMovies((prev) => {
      return prev.filter((prevMovie) => prevMovie.id !== movie.id);
    });
  }

  return (
    <>
      <Navigation />
      <LocalStorageContext.Provider value={{ movies, addMovie, removeMovie }}>
        <Routes>
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/popular" element={<PopularMovies />} />
          <Route path="/detail/:id" element={<MovieDetail />} />
          <Route path="/" element={<PopularMovies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LocalStorageContext.Provider>
    </>
  );
}

export default App;
