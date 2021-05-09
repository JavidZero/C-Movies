
document.addEventListener("DOMContentLoaded", () => {
    const moviesMain = new MovieMAIN();
    const uiMain = new UIMAIN();

    moviesMain.getMovieById().then((movie)=>{
        uiMain.displaySingleMovie(movie);
    })
})