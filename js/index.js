document.addEventListener("DOMContentLoaded", () => {
    const moviesMain = new MovieMAIN();
    const uiMain = new UIMAIN();

    moviesMain.getMovies('movie').then((movies) => {
        uiMain.getSlider(movies);
        uiMain.displayListOfMovies(movies,'movie');

    })

    moviesMain.getMovies('tv').then((tv) => {
        uiMain.getSlider(tv);
        uiMain.displayListOfMovies(tv,'tv');
        uiMain.displaySlider(sliderArray);
    })


})