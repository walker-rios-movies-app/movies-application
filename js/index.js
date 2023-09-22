// import keys from "./keys.js";

import {getMovies, getMovie, deleteMovie, postMovie, searchMovieByTitle, patchMovie, renderMovie} from "./api/movies.js"



(async()=>{

    const movies = await getMovies();
    console.log(movies);
    for (let movie of movies) {
        const target = document.querySelector(".movies-grid")
        renderMovie(movie,target);


    }

    // $(".deletebtn").on("click",async function () {
    //     $(this)
    //     deleteMovie(this.id)
    //     let movies = await getMovies()
    //     renderMovie(movies)
    // })

    // const thing = movie.id
    // const deleteBtn = document.querySelector(`.movies-card[data-id="${thing}"]`)
    // console.log(deleteBtn);
    // deleteBtn.addEventListener("click", () => {
    //     // alert(`${movie.title} was deleted.`)
    //     alert('boom')
    // })


    // const editbtn = document.getElementById("edit-btn");
    //
    // editbtn.onclick = function() {
    //     modal.style.display = "block"; }

    // const deletebtn = document.querySelector(".delete-btn");
    //
    // deletebtn.onclick = function () {
    //     deleteMovie(5);
    //     console.log("clicked")
    // }

})();
