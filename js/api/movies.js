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
//function that renders the edited modal
const renderEditModal = (movie, moviesCard) => {
    // creates a new div that displays the pre-existing data in that card in the modal
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

                    <button id="submit-edit" type="submit">Make Changes</button>
                    <div id="editMessageContainer"></div>
                </form>
            </div>
    `;
    modal.style.display = "block";
    const closeBtn = modal.querySelector('.editClose');
    //when the close button is clicked, this closes the modal
    closeBtn.addEventListener('click', ()=>{
      modal.remove();
    });
    //when the form in the modal is clicked, it simultaneously gets rid of e old card, and replaces it with the new card with the edited information that the user input
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

//renders the movies card
// uncommenting this out will allow you to see the loading spinner
const renderMovie= async (movie, target)=>{
    const moviesCard = document.createElement('article');
    moviesCard.classList.add('movies-card');
    moviesCard.setAttribute(`data-id`,`${movie.id}`)
    moviesCard.innerHTML =`
        <div class="d-flex justify-content-between">
            <div id="title" class="movies-card-title">${movie.title}</div>
            <p class="movies-card-year">${movie.year}</p>
        </div>
        <div class="column align-items-center">
            <p class="movies-card-description">${movie.movieSummary}</p>
            <div class="d-flex align-items-center justify-content-between"><span class="movies-card-span">${movie.rating}/10</span></div>
            <meter class="movies-card-meter" min="0" max="10" value="${movie.rating}" value="0.6" 
               max="0.9" 
               min="0.1" 
               optimum="0.1"
               high="0.5" 
               low="0.2"
                ></meter>
            <div class="d-flex align-items-center justify-content-start gap-10 flex-wrap">
                  ${
            movie.genre.map(genre => `
                            <span class="movies-card-tag">${genre}</span>
                        `).join('')
            }
            </div>
        </div>
<!--        hidden input that alllows the code to add/delete/edit using the id without it being shown to the user -->
        <input type ="hidden" value=" ${movie.id}">   
        <div class="d-flex justify-content-between">
            <!--Edit Button-->
            <div>
                <button class="card-btn btn-cta" data-action="edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>
            </div>
            <!--           Delete Button-->
            <div>
                <button class="card-btn" data-action="delete">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    //assigning the delete button to a variable 
    const deleteBtn = moviesCard.querySelector("[data-action='delete']");
    //delete button event listener that removes the card when the button is clicked
    deleteBtn.addEventListener("click", async () => {
        moviesCard.remove()
        console.log("deleteButton")

        await deleteMovie(movie.id);
    });

    //assigning the edit button to a variable
    const editBtn= moviesCard.querySelector("[data-action='edit']")
    //edit button event listener that opens a modal that allows the user to edit the movieCard that was clicked
    editBtn.addEventListener('click', ()=>{
        renderEditModal(movie, moviesCard);
    });

    target.appendChild(moviesCard)
}


export{getMovies, getMovie, deleteMovie, postMovie, searchMovieByTitle, patchMovie, renderMovie, renderEditModal};