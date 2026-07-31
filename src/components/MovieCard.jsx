function MovieCard() {
  return (
    <article className="movie-card">
      <div className="poster-placeholder">Movie Poster</div>

      <div className="movie-information">
        <h3>Sample Movie</h3>
        <p>PG-13 | 2 hr 10 min</p>
        <button type="button">View Showtimes</button>
      </div>
    </article>
  );
}

export default MovieCard;