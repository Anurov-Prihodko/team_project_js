// import genres from './genres';

export default function renderWatchedAndQueue({
  id,
  original_title,
  poster_path,
  genres,
  release_date,
  vote_average,
}) {
  return `<li class="movie-gallery-item" data-item="${id}">

    <img class="movie-gallery-item-poster" src="https://image.tmdb.org/t/p/w500${poster_path}"
        alt="image card movie" data-item="${id}" />

    <div class="movie-gallery-item-description" data-item="${id}">
        <h2 class="movie-gallery-item-title" data-item="${id}">${original_title}</h2>
        <div class="movie-gallery-item-box" data-item="${id}">
            <p class="movie-gallery-item-genre" data-item="${id}">${genres.reduce(   
    (allGenres, id) => {
      for (const genre of genres) {
        if (id === genre.id) {
          id = genre.id;
        }
      }
      allGenres.push(id.name);
      // let twoGenres = [];
      if (allGenres.length > 3) {
        const twoGenres = allGenres.slice(0, 2);
        twoGenres.push('Other');
        return twoGenres;
      }
      return allGenres;
    },
    [],
            )} | ${release_date}</p>
            <span class="movie-gallery-item-rating">${vote_average}</span>
        </div>

    </div>
</li>`;
}