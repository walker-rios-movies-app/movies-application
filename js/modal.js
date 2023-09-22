
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
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

submit.onclick = function(event) {
    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;
    const summary = document.getElementById('summary').value;
    const rating = document.getElementById('rating').value;
    const genre = document.getElementById('genre').value;

    const movieObject = {
        title: title,
        year: year,
        summary:summary,
        rating:rating,
        genre:genre
    }
    console.log(movieObject)

}

let nameInput = document.getElementById('myModal');
document.querySelector('form.pure-form').addEventListener('submit', function(e){
    e.preventDefault();
    console.log(nameInput.value)
})
