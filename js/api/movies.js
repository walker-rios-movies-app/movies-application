//Gets the movies from the api
const getMovies = async()=> {
    const url = "http://localhost:3000/movies"
    const options = {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        },
    };
    const response = await fetch(url, options);
    const movies = await response.json();
    return movies;
}
//gets a specific movie by id
const getMovie = async(id)=>{
    const url = `http://localhost:3000/movies/${id}`
    const options = {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        },
    };
    const response = await fetch(url, options);
    const movie = await response.json();
    return movie;
}

const deleteMovie = async (id) => {
    const url = `http://localhost:3000/movies/${id}`
    const options = {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json"
        },
    };
    const response = await fetch(url, options);
    const movie = await response.json();
    return movie;
}

const postMovie = async (movie) => {
    console.log(movie.title)
    try {

        const searchResult = await searchMovieByTitle(movie.title);
        if (searchResult.length > 0) {
            throw new Error("Movie already exists in the database");
        }

        const url = `http://localhost:3000/movies`
        const body = {
            id: movie.id,
            title: movie.title,
            year: movie.year,
            movieSummary: movie.movieSummary,
            rating: movie.rating,
            genre: movie.genre
        }
        const options = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(body),
        };
        const response = await fetch(url, options);
        const newId = await response.json();
        return newId;

    } catch (error) {
        return null;
    }
}
const patchMovie = async (movies) => {

    try {
        const url = `http://localhost:3000/books/${movies.id}`;
        const body = movies;
        const options = {
            "method": "PATCH",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(body),
        };
        const response = await fetch(url, options);
        const newId = await response.json();
        return newId;

    } catch (error) {
        console.log(error)
    }
}
const searchMovieByTitle = async (title) => {
    const url = `http://localhost:3000/movies?title=${title}`
    const options = {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, options);
    const movies = await response.json();
    return movies;
}
const renderMovie= async (movie, target)=>{
    const moviesCard = document.createElement('article');
    moviesCard.classList.add('movies-card');
    moviesCard.setAttribute(`data-id`,`${movie.id}`)
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
<!--        Edit Button-->
            <!--modal-->
       <button class="card-btn btn-cta" data-action="edit" id="editButton">Edit</button>
<!--           Delete Button-->
       <button class="card-btn" data-action="delete" id="delete-button">Delete</button>
    `;
    console.log(movie.id)
    console.log(movie)

    const deleteBtn = moviesCard.querySelector("#delete-button[data-action='delete']");

    deleteBtn.addEventListener("click", async () => {
        alert(`${movie.title} was deleted.`);
        moviesCard.remove()
        console.log("deleteButton")

        await deleteMovie(movie.id);
    });
    const editModal= document.getElementById("myEditModal");
    const editSpan = document.getElementsByClassName("editClose")[0];
    const submit = document.getElementById("submit-edit");


    const editBtn= moviesCard.querySelector("#editButton[data-action='edit']")

        editBtn.addEventListener('click', ()=>{
        editModal.style.display = "block"
    })

    editSpan.onclick = function(){
        editModal.style.display = "none";
    }

    window.onclick = function(event){
        if(event.target === editModal){
            editModal.style.display = "none";
        }
    }

    submit.onclick = async function (event){
        const title = document.getElementById('editedTitle').value;
        const year = document.getElementById('editedYear').value;
        const movieSummary = document.getElementById('editedMovieSummary').value;
        const rating = document.getElementById('editedRating').value;
        const genre = document.getElementById('editedGenre').value;

        const movieObject = {
            title: title,
            year: year,
            movieSummary:movieSummary,
            rating:rating,
            genre: genre.split(", ")
        }
        console.log(movieObject);
        try{
            const editedMovie = await patchMovie(movieObject)
            if(editedMovie){
                await renderMovie(movieObject, document.querySelector(".movies-grid"));
            } else{
                const editMessageContainer = document.getElementById("editMessageContainer");
                editMessageContainer.innerText = 'SUCCESS: Movie was edited successfully';
            }
        } catch (error){
            console.log(error)
        }
    }
    let editInput = document.getElementById("myEditModal");
    document.querySelector('form.pure-form').addEventListener('submit', function(e){
        e.preventDefault();
    })
    target.appendChild(moviesCard)
}


export{getMovies, getMovie, deleteMovie, postMovie, searchMovieByTitle, patchMovie, renderMovie};