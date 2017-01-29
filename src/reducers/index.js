import { combineReducers } from 'redux';

import {
    SEARCH_MOVIES,
    LOAD_MORE,
    LOADING,
} from '../actions';

function getGenresNamesByIds(genresList, genresIds) {
    return genresIds.map(id => genresList.filter(genre => genre.id === id)
        .map(genre => genre.name)).join(', ');
}

function getMoviesListWithGenres(moviesList, genresList) {
    return moviesList.map(movie => ({
        ...movie,
        genreNames: getGenresNamesByIds(genresList, movie.genre_ids),
    }));
}

function movies(state = { genresList: [], moviesList: [] }, action) {
    switch (action.type) {
        case SEARCH_MOVIES: {
            return {
                genresList: action.genres,
                moviesList: getMoviesListWithGenres(action.movies, action.genres),
            };
        }

        case LOAD_MORE: {
            return {
                genresList: state.genresList,
                moviesList: [
                    ...state.moviesList,
                    ...getMoviesListWithGenres(action.movies, state.genresList),
                ],
            };
        }

        default: {
            return state;
        }
    }
}

function pagesTotal(state = 0, action) {
    switch (action.type) {
        case SEARCH_MOVIES: {
            return action.totalPages;
        }

        default: {
            return state;
        }
    }
}

function currentPage(state = 1, action) {
    switch (action.type) {
        case SEARCH_MOVIES:
        case LOAD_MORE: {
            return action.currentPage;
        }

        default: {
            return state;
        }
    }
}

function currentQuery(state = '', action) {
    switch (action.type) {
        case SEARCH_MOVIES: {
            return action.currentQuery;
        }

        default: {
            return state;
        }
    }
}

function isLoading(state = false, action) {
    switch (action.type) {
        case LOADING: {
            return true;
        }

        case SEARCH_MOVIES:
        case LOAD_MORE: {
            return false;
        }

        default: {
            return state;
        }
    }
}

export default combineReducers({
    movies,
    currentPage,
    pagesTotal,
    currentQuery,
    isLoading,
});
