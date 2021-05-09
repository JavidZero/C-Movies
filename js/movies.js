document.addEventListener('DOMContentLoaded',()=>{
    const movieMain = new MovieMAIN();
    const uiMain = new UIMAIN();

    movieMain.getMovies('movie').then((movieList)=>{
        uiMain.displayListOfMovies(movieList);
    });

    uiMain.displayPages(movieMain.getPage(),'movie');

})