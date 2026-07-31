import "./App.css";
import MovieCard from "./components/MovieCard";
import movies from "./data/movies";

function App() {
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
                />
))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;