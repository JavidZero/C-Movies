const nav = document.querySelector(".nav");


const IMGPATH = "https://image.tmdb.org/t/p/w1280";

let sliderArray = [];

class MovieMAIN {

    getParameters() {
        let queryStr = window.location.search;
        let params = new URLSearchParams(queryStr);
        
        return params;
    }

    getSearchKeyword() {

        let params = this.getParameters();
        let query = params.get('keyword');

        return query;
    }

    async getMovieByKeyword(query) {
        let url = 'https://api.themoviedb.org/3/search/multi?api_key=04c35731a5ee918f014970082a0088b1&query=';

        try {
            let data = await fetch(url + query + '&page=1');
            let result = await data.json();
            result = result.results;

            let movies = result;

            movies = movies.sort(function (a, b) {
                return b.vote_average - a.vote_average;
            })

            return movies;

        }
        catch (error) {
            console.log(error.message);
        }
    }

    getPage(){
        let params = this.getParameters();
        let page = (params.get('page'))? params.get('page'):1;

        return page;
    }

    getMovieID(){
        let params = this.getParameters();
        let id = params.get('id');

        return id;
    }

    getType(){
        let params = this.getParameters();
        let type = params.get('type');

        return type;
    }

    async getMovies(type) {
        let page = this.getPage();

        let url = `https://api.themoviedb.org/3/discover/${type}?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`;


        let list = this.getList(url);
        return list;
    }


    async getList(url) {
        try {
            let result = await fetch(url);
            let data = await result.json();
            data = data.results;

            let tv = data;

            return tv;

        }
        catch (error) {
            console.log(error.message);
        }
    }

    async getMovieById() {
        let id = this.getMovieID();
        let type = this.getType();

        let url = `https://api.themoviedb.org/3/${type}/${id}?api_key=04c35731a5ee918f014970082a0088b1`;
        console.log(url);


        let data = await fetch(url);
        let result = await data.json();
        console.log(result);

        return result;
    }
}

class UIMAIN {
    /* Setting up eventlisteners for menu bar and search button */
    setupAPP() {
        this.displayNavigation();

        const navLink = document.querySelector(".nav-links");
        const navhamburger = document.querySelector(".nav-hamburger");
        const navSearchShowButton = document.querySelector(".nav-search-button");
        const navLogin = document.querySelector(".nav-login");
        const navSearch = document.querySelector(".nav-search");
        const navSearchInput = document.querySelector(".nav-search-input");
        const navSearchButton = document.querySelector(".nav-search-button-inside");
        const navLinks = document.querySelectorAll("nav-links li");
        
        navhamburger.addEventListener('click', () => {
            if (navLink.classList.contains('open')) {
                navLink.classList.remove('open');
            }
            else {
                if (navSearch.classList.contains('open'));
                {
                    navSearch.classList.remove('open');
                }

                navLink.classList.add('open');
            }
        });

        navSearchShowButton.addEventListener('click', () => {
            if (navSearch.classList.contains('open')) {
                navSearch.classList.remove('open');
            }
            else {
                if (navLink.classList.contains('open'));
                {
                    navLink.classList.remove('open');
                }

                navSearch.classList.add('open');
            }
        })

        navSearchInput.addEventListener('keyup', (event) => {
            if (event.keyCode == 13) {
                this.search();
            }

            else {
                this.instantSearch(navSearchInput.value);
            }
        });

        navSearchButton.addEventListener('click', (event) => {
            this.search();
        })
    
        navLinks.forEach((link)=>{
            link.addEventListener('click',()=>{
                navLink.classList.remove('open');
            })
        })
    }

    displayNavigation(){
        let pathName = window.location.pathname;
        let path = (pathName.includes('pages/')) ? '' : 'pages/';

        const div = document.createElement('div');
        div.classList.add('container');
        div.classList.add('nav-wrapper');
        div.innerHTML = `
                <!-- Navigation Menu Button-->
                <div class="nav-hamburger">
                    <span class="line"></span>
                </div>
                <!-- End Of Navigation Menu Button-->

                <!-- Navigation Logo -->
                <div class="nav-logo">
                    <a href="/index.html">
                        <h2><span>c</span>-movies</h2>
                    </a>
                </div>
                <!-- End of Navigation Logo -->

                <!-- Navigation Links-->
                <ul class="nav-links">
                    <li><a href="/index.html">home</a></li>
                    <li><a href="/pages/movies.html">movies</a></li>
                    <li><a href="/pages/tv-series.html">tv-series</a></li>
                </ul>
                <!-- End Of Navigation Links -->

                <!-- Search -->
                <div class="nav-search">
                    <input class="nav-search-input" type="text" placeholder="Search Movie">
                    <button class="nav-search-button-inside">
                        <i class="fas fa-search"></i>
                    </button>
                    <div class="nav-search-results">
                        
                    </div>
                </div>
                <!-- End Of Search -->

                <!-- Login Button-->
                <button class="nav-login">Login</button>
                <button class="nav-search-button">
                    <i class="fas fa-search"></i>
                </button>
                <!-- End Of Login Button -->
        `
    
            nav.appendChild(div);
    }

    /* Open Search Page when enter clicked */
    search() {
        let value = navSearchInput.value;
        if (value !== '') {
            let pathName = (window.location.pathname);
            let path = (pathName.includes('pages/')) ? '' : 'pages/';
            window.location.href = `${path}search.html?keyword=${value}`;
        }
    }

    /* Making Search While typing */
    async instantSearch(value) {
        const navSearchResultContainer = document.querySelector(".nav-search-results");

        let query = value;


        const movie = new MovieMAIN();

        if (query != '') {
            let movies = await movie.getMovieByKeyword(query);

            navSearchResultContainer.classList.add('open');
            this.displaySearchResult(movies);
        }
        else {
            this.clearSearchResult();
            navSearchResultContainer.classList.remove('open');
        }

    }

    /* Displaying Search Result in Search Result Bar*/
    displaySearchResult(movies) {
        this.clearSearchResult();

        const navSearchResultContainer = document.querySelector(".nav-search-results");

        let numberOfShown = 0;
        if (movies.length > 5) {
            numberOfShown = 5;
        }
        else {
            numberOfShown = movies.length;
        }

        for (let i = 0; i <numberOfShown; i++) {

            let movieItem = movies[i];

            let pathName = window.location.pathname;
            let path = (pathName.includes('pages/')) ? '' : 'pages/';

            let moviePoster = IMGPATH + movieItem.poster_path;
            let movieName = (movieItem.title !== undefined) ? movieItem.title : movieItem.name;
            let type = (movieItem.title !== undefined) ? 'movie' : 'tv';
            let moviehRef = `${path}film.html?name=${movieName}&id=${movieItem.id}&type=${type}`;

            const div = document.createElement('div');
            div.classList.add('nav-search-result-item');
            div.innerHTML = `
                    <img src=${moviePoster} alt="">
                    <div class="nav-search-result-item-info">
                    <a href="${moviehRef}"><h5>${movieName}</h5></a>
                        <span>
                            <p>Type</p>
                            <p>IMDB: ${movieItem.vote_average}</p>
                        </span>
                    </div>
            `;
            navSearchResultContainer.appendChild(div);
        }

    }

    /* Clearing Search Result Bar After Every Action*/
    clearSearchResult() {
        const navSearchResultContainer = document.querySelector(".nav-search-results");

        while (navSearchResultContainer.children.length > 0) {
            navSearchResultContainer.removeChild(navSearchResultContainer.children[0]);
        }
    }

    /* Displaying List of the given list */
    displayListOfMovies(moviesList, str){

        let mainListContainer;
        if (str=='movies'){
            mainListContainer = document.querySelector('.main-content-movies');
        }
        else if(str=='tv'){
            mainListContainer = document.querySelector('.main-content-tvseries');
        }

        else {
            mainListContainer = document.querySelector('.main-list-container');
        }

        moviesList.forEach(movieItem=>{
            let pathName = window.location.pathname;
            let path = (pathName.includes('pages/'))? '':'pages/';
            
            let moviePoster = IMGPATH + movieItem.poster_path;
            let movieName = (movieItem.title!==undefined)? movieItem.title:movieItem.name;
            let type = (movieItem.title !== undefined) ? 'movie' : 'tv';
            let moviehRef = `${path}film/${movieName}/${movieItem.id}/${type}`;

            const div = document.createElement('div');
            div.classList.add('main-list-item');
            div.innerHTML = `
                <a href="${moviehRef}">
                    <img src="${moviePoster}" alt="">
                    <h5>${movieName}</h5>
                </a>
            `;

            mainListContainer.appendChild(div);
        })


    }

    /* Displaying Single Movie or TV-Series*/
    displaySingleMovie(movieItem){
        const container = document.querySelector(".movie-container");

        let genres = this.displayGenres(movieItem.genres);
        let moviePoster = IMGPATH + movieItem.poster_path;
        let movieName = (movieItem.title !== undefined) ? movieItem.title : movieItem.name;
        
        const div = document.createElement('div');
        div.classList.add("movie-container-body");
        div.innerHTML = `
             <!-- Container For Video -->
                        <div class="movie-video-container">
                            <img src=${moviePoster}>
                        </div>

                        <!-- Container For Movie Info -->
                        <div class="movie-info-container">
                            <h3 class="name">${movieName}</h3>
                            <h5 class="imdb">${movieItem.vote_average}</h5>
                            <p class="overview">
                                ${movieItem.overview}
                            </p>
            
                            <p class="other">Country: <span>
                            </span></p>
                            <p class="other">Genre: <span>${genres}</span></p>
                            <p class="other">Release: <span>${movieItem.release_date}</span></p>
                            <p class="other">Director: <span>AAAA</span></p>
                            <p class="other">Cast: <span>AAAA</span></p>
                        </div>

                        <!-- Container For Related Movies-->
                        <div class="movie-related-container">

                        </div>
        `;

        container.appendChild(div);
    }

    /* Getting Genre of Movie or TV-series*/
    displayGenres(genres) {
        let list = [];
        let pathName = window.location.pathname;
        let path = (pathName.includes('pages/')) ? '' : 'pages/';

        genres.forEach(genre => {
            let link = `${path}genre.html?genre=${genre.name}`;
            let str = `<a href="${link}">${genre.name}</a>`;

            list.push(str);
        });

        return list.join(', ');
    }

    /* Activate Slider */
    displaySlider(array) {
        const slide = document.querySelector('.slider');

        array.forEach(item => {
            let img = IMGPATH + item.backdrop_path;
            let name = (item.title !== undefined) ? item.title : item.name;
            const div = document.createElement('div');
            div.classList.add('slider-item');
            div.innerHTML = `
                    <img src=${img} alt="">
                    <div class="slider-item-text">
                        <h3>${name}</h3>
                        <div class="slider-item-category">Gender</div>
                    </div>;
            `
            slide.appendChild(div);
        })

        let item = array[0];
        let img = IMGPATH + item.backdrop_path;
        let name = (item.title !== undefined) ? item.title : item.name;
        const div = document.createElement('div');
        div.classList.add('slider-item');
        div.innerHTML = `
                    <img src=${img} alt="">
                    <div class="slider-item-text">
                        <h3>${name}</h3>
                        <div class="slider-item-category">Gender</div>
                    </div>;
            `
        slide.appendChild(div);

    }

    /* Getting List for Slider */
    getSlider(array) {
        for (let i = 0; i < 3; i++) {
            sliderArray.push(array[i]);
        }

    }


    /* Paging */
    displayPages(page,type) {
        const pageButtonsContainer = document.querySelector(".main-content-pages");

        let listType = (type==='movie')? 'movies':'tv-series';

        let pageNow = parseInt(page);


        let start;
        if (pageNow <= 3) {
            start = 1;
        }

        else if (pageNow > 497) {
            start = 496;
        }
        else {
            start = pageNow - 2;
        }


        const buttonPrev = document.createElement('a');
        buttonPrev.classList.add('page');
        buttonPrev.innerHTML = `<i class="fas fa-chevron-left">`;
        if (page == 1) {
            buttonPrev.href = `${listType}.html?page=${pageNow}`;
        }
        else {
            buttonPrev.href = `${listType}.html?page=${pageNow - 1}`;
        }

        pageButtonsContainer.appendChild(buttonPrev);

        for (let i = 0; i < 5; i++) {
            let pageNumb = start + i;

            const buttonNumb = document.createElement('a');
            buttonNumb.classList.add('page');
            if (pageNumb == pageNow) {
                buttonNumb.classList.add('active');
            }

            buttonNumb.innerText = pageNumb;
            buttonNumb.href = `${listType}.html?page=${pageNumb}`;
            pageButtonsContainer.appendChild(buttonNumb);
        }

        const buttonNext = document.createElement('a');
        buttonNext.classList.add('page');
        buttonNext.innerHTML = `<i class="fas fa-chevron-right">`;
        if (pageNow == 20) {
            buttonNext.href = `${listType}.html?page=${page}`;
        }
        else {
            buttonNext.href = `${listType}.html?page=${pageNow + 1}`;
        }

        pageButtonsContainer.appendChild(buttonNext);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UIMAIN();

    ui.setupAPP();
})