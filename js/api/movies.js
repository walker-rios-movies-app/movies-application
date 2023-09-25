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
const patchMovie = async (movie) => {

    try {
        const url = `http://localhost:3000/movies/${movie.id}`;
        console.log(url)
        console.log(`${movie.id}`);
        const body = movie;
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

const renderEditModal = (movie, moviesCard) => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
                <span class="editClose">&times;</span>
                <!--            form-->
                <form class="pure-form" method="post">
                    <label><b>Edit Movie.....</b></label>
                    <input id="editedTitle" type="text" placeholder="Enter Movie" value="${movie.title}">

                    <label><b>Edit year....</b></label>
                    <input id="editedYear" type="text" placeholder="Year" value="${movie.year}">

                    <label><b>Edit  Summary...</b></label>
                    <input id="editedMovieSummary" type="text" placeholder="summary" value="${movie.movieSummary}">

                    <label><b>Edit rating...</b></label>
                    <input id="editedRating" type="text" placeholder="rating out of 10" value="${movie.rating}">

                    <label><b>Edit genre....</b></label>
                    <input id="editedGenre" type="text" placeholder="Add Genre" value="${movie.genre.join(', ')}">

                    <button id="submit-edit" type="submit">Add Movie</button>
                    <div id="editMessageContainer"></div>
                </form>
            </div>
        </div>
    `;
    modal.style.display = "block";
    const closeBtn = modal.querySelector('.editClose');
    closeBtn.addEventListener('click', ()=>{
      modal.remove();
    });
    const submitBtn = modal.querySelector('#submit-edit');
    submitBtn.addEventListener('click', async ()=>{
        const newMovieObj = {
            id: movie.id,
            title: modal.querySelector('#editedTitle').value,
            year: modal.querySelector('#editedYear').value,
            summary: modal.querySelector('#editedMovieSummary').value,
            rating: modal.querySelector('#editedRating').value,
            genre: modal.querySelector('#editedGenre').value.split(", "),
        }
        try {
            await patchMovie(newMovieObj);
            moviesCard.remove();
            await renderMovie(newMovieObj);
            modal.remove();
        } catch (e) {
            console.log(e);
        }
    });
    document.body.appendChild(modal);
}
const renderMovie= async (movie, target)=>{
    const moviesCard = document.createElement('article');
    moviesCard.classList.add('movies-card');
    moviesCard.setAttribute(`data-id`,`${movie.id}`)
    moviesCard.innerHTML =`
    <div id="title" class="movies-card-title">${movie.title}</div>
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
        
        <input type ="hidden" value=" ${movie.id}">   
<!--        Edit Button-->
            <!--modal-->
       <button class="card-btn btn-cta" data-action="edit">Edit</button>
       
<!--           Delete Button-->
       <button class="card-btn" data-action="delete">Delete</button>
    `;
    console.log(movie.id)
    console.log(movie)

    const deleteBtn = moviesCard.querySelector("[data-action='delete']");

    deleteBtn.addEventListener("click", async () => {
        alert(`${movie.title} was deleted.`);
        moviesCard.remove()
        console.log("deleteButton")

        await deleteMovie(movie.id);
    });

    const editModal= document.getElementById("myEditModal");
    const editSpan = document.getElementsByClassName("editClose")[0];


    const editBtn= moviesCard.querySelector("[data-action='edit']")

    editBtn.addEventListener('click', ()=>{
        renderEditModal(movie, moviesCard);
    });
    target.appendChild(moviesCard)
}


export{getMovies, getMovie, deleteMovie, postMovie, searchMovieByTitle, patchMovie, renderMovie};