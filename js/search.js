
document.addEventListener('DOMContentLoaded', () => {
    const movieMain = new MovieMAIN();
    const uiMain = new UIMAIN();

    let query = movieMain.getSearchKeyword();

    movieMain.getMovieByKeyword(query).then((movies) => {
        uiMain.displayListOfMovies(movies);
    })
})