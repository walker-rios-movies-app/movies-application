import {postMovie, renderMovie} from "./api/movies.js";

// const editModal= document.getElementById("myEditModal");
// const editBtn= document.getElementById("editButton");
// const editSpan = document.getElementsByClassName("close");
// const submit = document.getElementById("submit-edit");
//
// editBtn.onclick= function(){
//     editModal.style.display = "block";
// }
// // document.querySelector("#editButton").addEventListener('click', ()=>{
// //     editModal.style.display = "block"
// // })
// editSpan.onclick = function(){
//     editModal.style.display = "none";
// }
//
// window.onclick = function(event){
//     if(event.target === editModal){
//         editModal.style.display = "none";
//     }
// }
//
// submit.onclick = async function (event){
//     const title = document.getElementById('editedTitle').value;
//     const year = document.getElementById('editedYear').value;
//     const movieSummary = document.getElementById('editedMovieSummary').value;
//     const rating = document.getElementById('editedRating').value;
//     const genre = document.getElementById('editedGenre').value;
//
//     const movieObject = {
//         title: title,
//         year: year,
//         movieSummary:movieSummary,
//         rating:rating,
//         genre: genre.split(", ")
//     }
//     console.log(movieObject);
//     try{
//         const editedMovie = await postMovie(movieObject)
//         if(editedMovie){
//             renderMovie(movieObject, document.querySelector(".movies-grid"));
//         } else{
//             const editMessageContainer = document.getElementById("editMessageContainer");
//             editMessageContainer.innerText = 'SUCCESS: Movie was edited successfully';
//         }
//     } catch (error){
//         console.log(error)
//     }
// }
// let editInput = document.getElementById("myEditModal");
// document.querySelector('form.pure-form').addEventListener('submit', function(e){
//     e.preventDefault();
// })
