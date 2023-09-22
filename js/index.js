// import keys from "./keys.js";

import {getMovies, getMovie, deleteMovie, postMovie, searchMovieByTitle, patchMovie, renderMovie} from "./api/movies.js"



(async()=>{
    const movies = await getMovies();
    console.log(movies);
    for (let movie of movies) {
        const target = document.querySelector(".movies-grid")
        renderMovie(movie,target);
    }


})();
