function searchActive(value)
{
    const input = document.querySelector(".nav__input");
    input.focus();
}

async function searchBarEnter(event)
{
    let value = document.querySelector(".nav__input").value;
    const input = document.querySelector(".nav__input");

    if (event.keyCode == 13)
    {
        if (input === document.activeElement)
        {
            searchResult(value);
            await moviesSearch(value)
            return setTimeout (() => loadingDone(), 1000)
        }
        value = document.querySelector(".movie__input").value;
        searchResult(value);
        await moviesSearch(value);
        setTimeout(() => loadingDone(), 1000)
    }
}

async function searchBarClick()
{
    const value = document.querySelector(".movie__input").value;

    searchResult(value);
    await moviesSearch(value)
    setTimeout(() => loadingDone(), 1000)
}

function searchResult(value)
{
    const searchBar = document.querySelector(".movie__top");

    const searchResult = document.querySelector(".movie__search__result");

    const searchBarHTML = `<h4 class="movie__top__title">Search results for:</h4>
                        <h4 class="movie__search__result">"${value}"</h4>`;
    searchBar.innerHTML = searchBarHTML;

    searchBar.classList.add("movie__search__result-visible");
}

async function moviesSearch(value)
{

    const response = await fetch (`http://www.omdbapi.com/?i=tt3896198&apikey=5b22431b&s=${value}`);

    const searchResults = await response.json();
    const array = await searchResults.Search.slice(0,6);
    const movies = document.querySelector(".movie__list");
    const moviesHTML = array.map((movie) => `<div class="movie movie__invisible">
                            <figure class="movie__image__wrapper">
                                <img src="${movie.Poster}" alt="" class="movie__info__image">
                                <h3 class="movie__back__title">${movie.Title}}</h3>
                                <div class="movie__info__list">
                                    <div class="movie__info1">
                                        <i class="fa-solid fa-clock movie__info__icon"></i>
                                        <p class="movie__text">136m</p>
                                    </div>
                                    <div class="movie__info2">
                                        <i class="fa-solid fa-star movie__info__icon"></i>
                                        <p class="movie__text">4.5</p>
                                    </div>
                                    <div class="movie__info3">
                                        <i class="fa-solid fa-earth-americas movie__info__icon"></i>
                                        <p class="movie__text">English</p>
                                    </div>
                                </div>
                            </figure>
                            <h4 class="movie__title">${movie.Title}</h4>
                        </div>`).join("");
    
                        movies.innerHTML = `<i class="fa-solid fa-spinner movies__list__loading 
                        movies__list__loading-visible"></i>` + moviesHTML

                        console.log('pending');
}

function loadingDone()
{
    const targetMovie = document.querySelectorAll(".movie");

    const targetLoading = document.querySelector(".movies__list__loading");

    targetLoading.classList.remove("movies__list__loading-visible");
    targetMovie.forEach((movie) => movie.classList.remove("movie__invisible"));

    console.log('remove')
}