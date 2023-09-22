// import keys from "./keys.js";

import {getMovies, getMovie, deleteMovie, postMovie, searchMovieByTitle, patchMovie} from "./api/movies.js"

const renderMovie=(movie, target)=>{
    const moviesCard = document.createElement('article');
    moviesCard.classList.add('movies-card');
    moviesCard.innerHTML =`
    <div class="movies-card-title">${movie.title}</div>
        <p class="movies-card-year">${movie.year}</p>
        <p class="movies-card-description">${movie.movieSummary}</p>
        <div class="d-flex align-items-center justify-content-between"><span class="movies-card-span">${movie.rating}/10</span></div>
        <meter class="movies-card-meter" min="0" max="10" value="${movie.rating}"></meter>
        <div class="d-flex align-items-center justify-content-start gap-10 flex-wrap">
              ${
        movie.genre.map(genre => `
                        <span class="movies-card-tag">${genre}</span>
                    `).join('')
    }
        </div>
    `;
    target.appendChild(moviesCard)
}


(async()=>{
    const movies = await getMovies();
    console.log(movies);
    for (let movie of movies) {
        const target = document.querySelector(".movies-grid")
        renderMovie(movie,target);
    }


})();
