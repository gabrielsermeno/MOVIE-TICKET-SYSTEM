import { useState } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
import movies from "./data/movies";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [showSeatMap, setShowSeatMap] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatRows = ["A", "B", "C", "D", "E"];
  const seatsPerRow = 8;

  function handleMovieSelection(movie) {
    setSelectedMovie(movie);
    setSelectedShowtime(null);
    setShowSeatMap(false);
    setSelectedSeats([]);
  }

  function handleShowtimeSelection(showtime) {
    setSelectedShowtime(showtime);
    setShowSeatMap(false);
    setSelectedSeats([]);
  }

  function handleSeatClick(seatNumber) {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(
        selectedSeats.filter((seat) => seat !== seatNumber),
      );
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  }

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
                onViewShowtimes={() => handleMovieSelection(movie)}
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
                    onClick={() => handleShowtimeSelection(showtime)}
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

                  <button
                    type="button"
                    className="continue-button"
                    onClick={() => setShowSeatMap(true)}
                  >
                    Select Seats
                  </button>
                </div>
              )}
            </section>
          )}

          {showSeatMap && selectedMovie && selectedShowtime && (
            <section className="seat-section">
              <h2>Select Your Seats</h2>

              <p>
                {selectedMovie.title} — {selectedShowtime}
              </p>

              <div className="screen">SCREEN</div>

              <div className="seat-map">
                {seatRows.map((row) => (
                  <div className="seat-row" key={row}>
                    <span className="row-label">{row}</span>

                    {Array.from(
                      { length: seatsPerRow },
                      (_, index) => {
                        const seatNumber = `${row}${index + 1}`;
                        const isSelected =
                          selectedSeats.includes(seatNumber);

                        return (
                          <button
                            key={seatNumber}
                            type="button"
                            className={`seat ${
                              isSelected ? "selected-seat" : ""
                            }`}
                            onClick={() =>
                              handleSeatClick(seatNumber)
                            }
                            aria-label={`Seat ${seatNumber}`}
                            aria-pressed={isSelected}
                          >
                            {index + 1}
                          </button>
                        );
                      },
                    )}
                  </div>
                ))}
              </div>

              {selectedSeats.length > 0 && (
                <div className="seat-summary">
                  <h3>Selected Seats</h3>
                  <p>{selectedSeats.join(", ")}</p>
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