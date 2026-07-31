function MovieCard({ title, rating, runtime, onViewShowtimes }) {
  return (
    <article className="movie-card">
      <div className="poster-placeholder">Movie Poster</div>

      <div className="movie-information">
        <h3>{title}</h3>

        <p>
          {rating} | {runtime}
        </p>

        <button type="button" onClick={onViewShowtimes}>
          View Showtimes
        </button>
      </div>
    </article>
  );
}

export default MovieCard;