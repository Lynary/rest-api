//JQUERY

// function searchMovie() {
//   $.ajax({
//     url: "http://www.omdbapi.com/?apikey=58a858a4&s=" + $(".input-keyword").val(),
//     success: (result) => {
//       const movies = result.Search;
//       let cards = "";

//       movies.forEach((movie) => {
//         cards += tampilCards(movie);
//       });

//       $(".movie-container").html(cards);

//       $(".modal-detail-button").on("click", function () {
//         $.ajax({
//           url: "http://www.omdbapi.com/?apikey=58a858a4&i=" + $(this).data("imdbid"),
//           success: (m) => {
//             Details = tampilDetails(m);
//             $(".modal-body").html(Details);
//           },
//           error: (e) => {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// }

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  searchMovie();
});

const inputKeyword = document.querySelector(".input-keyword");
inputKeyword.addEventListener("keyup", function (e) {
  if (e.which === 13) {
    searchMovie();
  }
});

function searchMovie() {
  return fetch("http://www.omdbapi.com/?apikey=58a858a4&s=" + inputKeyword.value)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.Search;
      updateUI(movies);
    });
}

function updateUI(movies) {
  let cards = "";
  const movieContainer = document.querySelector(".movie-container");
  movies.forEach((movie) => (cards += tampilCards(movie)));
  movieContainer.innerHTML = cards;
}

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateUIDetail(movieDetail);
  }
});

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=58a858a4&i=" + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}

function updateUIDetail(m) {
  const tampilDetail = tampilDetails(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = tampilDetail;
}

function tampilCards(movie) {
  return `<div class="col-md-3 my-3">
      <div class="card">
        <img src="${movie.Poster}" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Tahun : ${movie.Year}</h6>
          <h6 class="card-subtitle mb-2 text-muted mb-3">Tipe : ${movie.Type}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetails" data-imdbid="${movie.imdbID}">Details</a>
        </div>
      </div>
    </div>`;
}

function tampilDetails(m) {
  return `<div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <img src="${m.Poster}" class="img-fluid" />
        </div>
        <div class="col">
          <ul class="list-group">
            <li class="list-group-item"><h4>${m.Title}</h4></li>
            <li class="list-group-item"><strong>Genre : ${m.Genre} </strong></li>
            <li class="list-group-item"><strong>Aktor : ${m.Actors}</strong></li>
            <li class="list-group-item"><strong>Rating : ${m.imdbRating} & ${m.imdbVotes} Vote</strong></li>
            <li class="list-group-item">
              <strong>Sinopsis : </strong> <br />
              ${m.Plot}
            </li>
          </ul>
        </div>
      </div>
    </div>`;
}
