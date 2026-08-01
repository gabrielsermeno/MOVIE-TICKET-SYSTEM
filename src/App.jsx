import { useState } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
import movies from "./data/movies";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [showSeatMap, setShowSeatMap] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const seatRows = ["A", "B", "C", "D", "E"];
  const seatsPerRow = 8;

  const reservedSeats = [
    "A3",
    "A4",
    "B6",
    "C2",
    "C3",
    "D7",
    "E5",
  ];

  const ticketPrice = 12.5;
  const subtotal = selectedSeats.length * ticketPrice;

  function handleMovieSelection(movie) {
    setSelectedMovie(movie);
    setSelectedShowtime(null);
    setShowSeatMap(false);
    setSelectedSeats([]);
    setShowCheckout(false);
    setConfirmation(null);
  }

  function handleShowtimeSelection(showtime) {
    setSelectedShowtime(showtime);
    setShowSeatMap(false);
    setSelectedSeats([]);
    setShowCheckout(false);
    setConfirmation(null);
  }

  function handleSeatClick(seatNumber) {
    if (reservedSeats.includes(seatNumber)) {
      return;
    }

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(
        selectedSeats.filter((seat) => seat !== seatNumber),
      );
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }

    setShowCheckout(false);
    setConfirmation(null);
  }

  function handleCustomerChange(event) {
    const { name, value } = event.target;

    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [name]: value,
    }));
  }

  function handleCheckoutSubmit(event) {
    event.preventDefault();

    const confirmationNumber = `CC-${Date.now()
      .toString()
      .slice(-8)}`;

    setConfirmation({
      confirmationNumber,
      customerName: `${customer.firstName} ${customer.lastName}`,
      email: customer.email,
      movieTitle: selectedMovie.title,
      showtime: selectedShowtime,
      seats: [...selectedSeats],
      total: subtotal,
    });

    setShowCheckout(false);
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
                    onClick={() => {
                      setShowSeatMap(true);
                      setShowCheckout(false);
                      setConfirmation(null);
                    }}
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

              <div className="seat-legend">
                <div>
                  <span className="legend-seat available-example"></span>
                  Available
                </div>

                <div>
                  <span className="legend-seat selected-example"></span>
                  Selected
                </div>

                <div>
                  <span className="legend-seat reserved-example"></span>
                  Unavailable
                </div>
              </div>

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
                        const isReserved =
                          reservedSeats.includes(seatNumber);

                        return (
                          <button
                            key={seatNumber}
                            type="button"
                            className={`seat ${
                              isReserved
                                ? "reserved-seat"
                                : isSelected
                                  ? "selected-seat"
                                  : ""
                            }`}
                            onClick={() =>
                              handleSeatClick(seatNumber)
                            }
                            disabled={isReserved}
                            aria-label={
                              isReserved
                                ? `Seat ${seatNumber} is unavailable`
                                : `Seat ${seatNumber}`
                            }
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
                  <h3>Order Summary</h3>

                  <p>
                    <strong>Movie:</strong> {selectedMovie.title}
                  </p>

                  <p>
                    <strong>Showtime:</strong> {selectedShowtime}
                  </p>

                  <p>
                    <strong>Seats:</strong> {selectedSeats.join(", ")}
                  </p>

                  <p>
                    <strong>Tickets:</strong> {selectedSeats.length}
                  </p>

                  <p>
                    <strong>Price per ticket:</strong>{" "}
                    ${ticketPrice.toFixed(2)}
                  </p>

                  <p className="order-total">
                    <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
                  </p>

                  <button
                    type="button"
                    className="checkout-button"
                    onClick={() => {
                      setShowCheckout(true);
                      setConfirmation(null);
                    }}
                  >
                    Continue to Checkout
                  </button>
                </div>
              )}
            </section>
          )}

          {showCheckout && selectedSeats.length > 0 && (
            <section id="checkout" className="checkout-section">
              <h2>Checkout</h2>

              <div className="checkout-layout">
                <form
                  className="checkout-form"
                  onSubmit={handleCheckoutSubmit}
                >
                  <div className="form-group">
                    <label htmlFor="firstName">First name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={customer.firstName}
                      onChange={handleCustomerChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={customer.lastName}
                      onChange={handleCustomerChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={customer.email}
                      onChange={handleCustomerChange}
                      required
                    />
                  </div>

                  <button type="submit" className="purchase-button">
                    Complete Purchase
                  </button>
                </form>

                <aside className="checkout-summary">
                  <h3>Purchase Summary</h3>

                  <p>
                    <strong>Movie:</strong> {selectedMovie.title}
                  </p>

                  <p>
                    <strong>Showtime:</strong> {selectedShowtime}
                  </p>

                  <p>
                    <strong>Seats:</strong> {selectedSeats.join(", ")}
                  </p>

                  <p>
                    <strong>Tickets:</strong> {selectedSeats.length}
                  </p>

                  <p className="checkout-total">
                    <strong>Total:</strong> ${subtotal.toFixed(2)}
                  </p>
                </aside>
              </div>
            </section>
          )}

          {confirmation && (
            <section id="tickets" className="confirmation-section">
              <h2>Purchase Confirmed</h2>

              <p className="confirmation-message">
                Thank you, {confirmation.customerName}. Your tickets are
                confirmed.
              </p>

              <div className="digital-ticket">
                <div className="ticket-header">
                  <h3>Cinema Central</h3>
                  <span>Digital Ticket</span>
                </div>

                <div className="ticket-details">
                  <p>
                    <strong>Confirmation:</strong>{" "}
                    {confirmation.confirmationNumber}
                  </p>

                  <p>
                    <strong>Movie:</strong> {confirmation.movieTitle}
                  </p>

                  <p>
                    <strong>Showtime:</strong> {confirmation.showtime}
                  </p>

                  <p>
                    <strong>Seats:</strong>{" "}
                    {confirmation.seats.join(", ")}
                  </p>

                  <p>
                    <strong>Total paid:</strong> $
                    {confirmation.total.toFixed(2)}
                  </p>

                  <p>
                    <strong>Email:</strong> {confirmation.email}
                  </p>
                </div>

                <div className="ticket-barcode-placeholder">
                  {confirmation.confirmationNumber}
                </div>
              </div>
            </section>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;