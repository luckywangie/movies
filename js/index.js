document.addEventListener('DOMContentLoaded', () => {
    const movieDetails = document.getElementById('movie-details');
    const filmsList = document.getElementById('films');
    const poster = document.getElementById('poster');
    const title = document.getElementById('title');
    const runtime = document.getElementById('runtime');
    const showtime = document.getElementById('showtime');
    const availableTickets = document.getElementById('available-tickets');
    const buyTicketButton = document.getElementById('buy-ticket');

    let currentMovie = {};

    // Function to fetch and display a movie's details by ID
    async function fetchMovieById(id) {
        try {
            const response = await fetch(`http://localhost:3000/films/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching movie by ID:', error);
        }
    }

    // Function to fetch and display all movies
    async function fetchAllMovies() {
        try {
            const response = await fetch('http://localhost:3000/films');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching all movies:', error);
        }
    }

    // Fetch and display the first movie's details
    fetchMovieById(1)
        .then(movie => {
            if (movie) {
                currentMovie = movie;
                displayMovieDetails(movie);
            }
        });

    // Fetch and display all movies
    fetchAllMovies()
        .then(movies => {
            if (movies) {
                movies.forEach(movie => {
                    const li = document.createElement('li');
                    li.textContent = movie.title;
                    li.className = 'film-item';
                    li.addEventListener('click', () => {
                        currentMovie = movie;
                        displayMovieDetails(movie);
                    });
                    filmsList.appendChild(li);
                });
            }
        });

    // Function to display movie details
    function displayMovieDetails(movie) {
        poster.src = movie.poster;
        poster.alt = `${movie.title} Poster`;
        title.textContent = movie.title;
        runtime.textContent = `Runtime: ${movie.runtime} minutes`;
        showtime.textContent = `Showtime: ${movie.showtime}`;
        const availableTicketsCount = movie.capacity - movie.tickets_sold;
        availableTickets.textContent = `Available Tickets: ${availableTicketsCount}`;
        buyTicketButton.disabled = availableTicketsCount === 0;
    }

    // Event listener for "Buy Ticket" button
    buyTicketButton.addEventListener('click', () => {
        const availableTicketsCount = currentMovie.capacity - currentMovie.tickets_sold;
        if (availableTicketsCount > 0) {
            currentMovie.tickets_sold++;
            displayMovieDetails(currentMovie);
        }
    });
});
