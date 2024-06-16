document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const results = document.getElementById('results');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            searchMovies(query);
        }
});

async function searchMovies(query) {
    const apiKey = '6fdeb621';
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === 'True') {
            console.log(data.Search);
            displayMovies(data.Search);
        } else {
            results.innerHTML = `<p>${data.Error}</p>`;
        }
    } catch (error) {
        results.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    }
}

function displayMovies(movies) {
    results.innerHTML = movies.map(movie => `
        <div class="movie">
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        </div>
    `).join('');
}
});