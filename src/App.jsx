import { useState } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
import movies from "./data/movies";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  return (
    <div className="app">
      <header className="site-header">
        <h1>Cinema Central</h1>

        <nav>
          <a href="#movies">Movies</a>
          <a href="#showtimes">Showtimes</a>
          <a href="#tickets">My Tickets</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h2>Now Showing</h2>
          <p>Select a movie, choose a showtime, and reserve your seats.</p>
        </section>

        <section id="movies" className="movie-section">
  <h2>Movies</h2>

  <div className="movie-grid">
    {movies.map((movie) => (
      <MovieCard
        key={movie.id}
        title={movie.title}
        rating={movie.rating}
        runtime={movie.runtime}
        onViewShowtimes={() => {
          setSelectedMovie(movie);
          setSelectedShowtime(null);}}
      />
    ))}
  </div>

  {selectedMovie && (
  <section id="showtimes" className="showtime-section">
    <h2>{selectedMovie.title} Showtimes</h2>

    <div className="showtime-list">
      {selectedMovie.showtimes.map((showtime) => (
        <button
          key={showtime}
          type="button"
          className={`showtime-button ${
            selectedShowtime === showtime ? "selected" : ""
          }`}
          onClick={() => setSelectedShowtime(showtime)}
        >
          {showtime}
        </button>
      ))}
    </div>

    {selectedShowtime && (
      <div className="showtime-selection">
        <h3>Your Selection</h3>

        <p>
          <strong>Movie:</strong> {selectedMovie.title}
        </p>

        <p>
          <strong>Showtime:</strong> {selectedShowtime}
        </p>

        <button type="button" className="continue-button">
          Select Seats
        </button>
      </div>
    )}
  </section>
)}
</section>
      </main>
    </div>
  );
}

export default App;