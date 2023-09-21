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
            // id: movie.id,
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
        console.log(error)
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

export{getMovies, getMovie, deleteMovie, postMovie, searchMovieByTitle, patchMovie};