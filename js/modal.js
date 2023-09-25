import {postMovie, renderMovie, searchMovieByTitle} from "./api/movies.js";

const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("add-movie-btn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

const submit = document.getElementById("submit")

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

submit.onclick = async function(event) {
    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;
    const movieSummary = document.getElementById('movieSummary').value;
    const rating = document.getElementById('rating').value;
    const genre = document.getElementById('genre').value;

    const movieObject = {
        title: title,
        year: year,
        movieSummary:movieSummary,
        rating:rating,
        genre: genre.split(", ")
    }
    console.log(movieObject)
    try{
        const newMovie = await postMovie(movieObject)
        if(newMovie){
            renderMovie(movieObject, document.querySelector(".movies-grid"));
        } else {
            const messageContainer = document.getElementById('messageContainer');
            messageContainer.innerText = 'ERROR: This movie already exists in the database';

        }
    } catch (error){
        console.log(error)
    }

}

let nameInput = document.getElementById('myModal');
document.querySelector('form.pure-form').addEventListener('submit', function(e){
    e.preventDefault();
})