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
const renderMovie=(movie, target)=>{
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
        <div>
            <div>
               <button type="button" class="edit-btn" id="edit-btn">Edit Movie</button>
            </div>
        </div>
        
<!--           Delete Button-->
       <div class="flex-shrink justify-content-center"> 
            <!-- Trigger/Open The Modal -->
          <button id="deleteAll" class="deletebtn btn-cta">Delete</button>
                     <!-- The Modal -->
<!--             <div class="deleteModal">-->
<!--                  &lt;!&ndash; Modal content &ndash;&gt;-->
<!--               <div class="delete-modal-content">-->
<!--                    <span class="delete-close">&times;</span>-->
<!--                    <p>test</p>-->
<!--               </div>-->
<!--             </div>-->
       </div>
       
        
        
<!--              <div class="flex-shrink justify-content-center">-->
<!--                <button id="del-movie-btn" class="delete-btn btn btn-cta">Delete Movie</button>-->
<!--                &lt;!&ndash;                modal&ndash;&gt;-->
<!--                <div id="myModalD" class="modal">-->
<!--                    <div class="modal-content">-->
<!--                        <span class="close1">&times;</span>-->
<!--                        &lt;!&ndash;                        Form&ndash;&gt;-->
<!--                        <form class="pure-form" method="post">-->
<!--                -->
<!--                            <label><b>Delete Movie?</b></label>-->
<!--                            <input id="title" type="text" placeholder="Enter Movie" required>-->

<!--                            <button id="delete" type="submit">Delete Movie</button>-->
<!--                        </form>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->



       
    `;
    console.log(movie.id)
    console.log(movie)

    // const thing = movie
    // const deleteBtn = document.querySelector(`.movies-card[data-id="${thing}"]`)
    // console.log(document.querySelector("#deleteAll"));
    // console.log(deleteBtn);
    // deleteBtn.addEventListener("click", () => {
    //     // alert(`${movie.title} was deleted.`)
    //     alert('boom')
    // })



// document.getElementById("deleteBtn").addEventListener("click", ()=> deleteMovie())
//     console.log()

    // const deleteBtn = document.querySelector(`.movies-card[data-id="${movie.id}"]`)
    // console.log(deleteBtn);
    // deleteBtn.addEventListener("click", () => {
    //     // alert(`${movie.title} was deleted.`)
    //     alert('boom')
    // })

    // deleteBtn.addEventListener("click", async () => {
    //     alert(`${movie.Title} was deleted.`);
    //     movieCard.remove()
    //     console.log("deleteButton")
    //
    //     await deleteMovie(movie);
    // });

    target.appendChild(moviesCard)
}


export{getMovies, getMovie, deleteMovie, postMovie, searchMovieByTitle, patchMovie, renderMovie};