// import keys from "./keys.js";

import {getMovies, getMovie, deleteMovie, postMovie, searchMovieByTitle, patchMovie, renderMovie} from "./api/movies.js"

document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector(
            "body").style.visibility = "hidden";
        document.querySelector(
            "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
            "#loader").style.display = "none";
        document.querySelector(
            "body").style.visibility = "visible";
    }
};

(async()=>{
    const movies = await getMovies();
    console.log(movies);
    for (let movie of movies) {
        const target = document.querySelector(".movies-grid")
        renderMovie(movie,target);
    }

})();
