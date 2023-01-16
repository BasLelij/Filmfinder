// movies and li's

function createListItems(items) {
  const listUl = document.getElementById("films-ul");

  items.map((poster) => {
    const listItem = document.createElement("li");
    const image = document.createElement("img");
    image.src = poster;
    listItem.appendChild(image);
    listUl.appendChild(listItem);
  });

  return listUl;
}

const posters = movies.map((movie) => movie.poster);
const list = createListItems(posters);
document.body.appendChild(list);

// radio buttons

const movieTitles = movies.map((movie) => movie.title);

filterLatestMovies = () => {
  const moviesLaterThan = movies.filter((movie) => movie.year >= 2014);
  console.log(moviesLaterThan);
  return moviesLaterThan;
};

filterMovies = (wordInMovies) => {
  const moviesWithWordInIt = movies.filter((movie) =>
    movie.title.includes(wordInMovies)
  );
  console.log(moviesWithWordInIt);
  return moviesWithWordInIt;
};

function updateList(filteredMovies) {
  const listUl = document.getElementById("films-ul");
  const currentListItems = listUl.querySelectorAll("li");
  currentListItems.forEach((item) => item.remove());
  const filteredPosters = filteredMovies.map((movie) => movie.poster);
  createListItems(filteredPosters);
}

const handleOnChangeEvent = (event) => {
  let filteredMovies;
  switch (event.target.id) {
    case "latest-movies":
      filteredMovies = filterLatestMovies();
      break;
    case "avenger-movies":
      filteredMovies = filterMovies("Avenger");
      break;
    case "xmen-movies":
      filteredMovies = filterMovies("X-Men");
      break;
    case "princess-movies":
      filteredMovies = filterMovies("Princess");
      break;
    case "batman-movies":
      filteredMovies = filterMovies("Batman");
      break;
    default:
      location.reload();
  }
  const listUl = document.getElementById("films-ul");
  listUl.innerHTML = "";
  filteredMovies.forEach((movie) => {
    const listItem = document.createElement("li");
    const image = document.createElement("img");
    image.src = movie.poster;
    listItem.appendChild(image);
    listUl.appendChild(listItem);
  });
  addAnchorTags(
    filteredMovies.map((movie) => movie.poster),
    movies
  );
};

const latestMoviesButton = document.getElementById("latest-movies");
latestMoviesButton.addEventListener("change", handleOnChangeEvent);

const avengerMoviesButton = document.getElementById("avenger-movies");
avengerMoviesButton.addEventListener("change", handleOnChangeEvent);

const xmenMoviesButton = document.getElementById("xmen-movies");
xmenMoviesButton.addEventListener("change", handleOnChangeEvent);

const princessMoviesButton = document.getElementById("princess-movies");
princessMoviesButton.addEventListener("change", handleOnChangeEvent);

const batmanMoviesButton = document.getElementById("batman-movies");
batmanMoviesButton.addEventListener("change", handleOnChangeEvent);

// all movies button

const allMoviesButton = document.getElementById("all-movies");
allMoviesButton.addEventListener("change", function () {
  if (allMoviesButton.checked) {
    // location.reload();
    const list = createListItems(posters);
    document.body.appendChild(list);
    const mainElement = document.querySelector("main");
    const changeUlPlace = document.getElementById("films-ul");
    mainElement.appendChild(changeUlPlace);
  }
});

// making anchor tags

const posterForAnchors = posters;

function addAnchorTags(posterForAnchors, movies) {
  const images = document.querySelectorAll("img");
  images.forEach((image) => {
    const posterForAnchor = image.src;
    const movieForAnchor = movies.find(
      (movie) => movie.poster === posterForAnchor
    );
    if (movieForAnchor) {
      const anchor = document.createElement("a");
      anchor.href = `https://www.imdb.com/title/${movieForAnchor.imdbID}`;
      image.parentNode.replaceChild(anchor, image);
      anchor.appendChild(image);
    }
  });
}

addAnchorTags(posterForAnchors, movies);

// ul was buiten de main tags geplaatst

const mainElement = document.querySelector("main");
const changeUlPlace = document.getElementById("films-ul");
mainElement.appendChild(changeUlPlace);
