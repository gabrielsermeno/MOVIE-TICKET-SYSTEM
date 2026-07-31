import "./App.css";

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
            <article className="movie-card">
              <div className="poster-placeholder">Movie Poster</div>

              <div className="movie-information">
                <h3>Sample Movie</h3>
                <p>PG-13 | 2 hr 10 min</p>
                <button type="button">View Showtimes</button>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;