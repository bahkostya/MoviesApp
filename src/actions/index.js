import api from '../api';

export const SEARCH_MOVIES = 'SEARCH_MOVIES';
export const LOAD_MORE = 'LOAD_MORE';
export const LOADING = 'LOADING';
export const GET_GENRES = 'GET_GENRES';

export const loading = () => ({
    type: LOADING,
});

export const searchMovies =
    (currentQuery, movies = [], currentPage = 1, totalPages = 1, genres = []) => ({
        type: SEARCH_MOVIES,
        currentQuery,
        movies,
        currentPage,
        totalPages,
        genres,
    });

export const fetchSearchMovies = query => dispatch => {
    dispatch(loading());

    return Promise.all([api.searchMovies(query), api.getGenres()])
        .then(response => {
            const {
                page,
                results,
                total_pages,
            } = response[0];
            const genres = response[1].genres;
            dispatch(searchMovies(query, results, page, total_pages, genres));
        });
};

export const loadMore = (currentPage, movies) => ({
    type: LOAD_MORE,
    currentPage,
    movies,
});

export const fetchLoadMore = (query, queryPage) => dispatch => {
    dispatch(loading());

    return api.searchMovies(query, queryPage)
    .then(response => {
        const {
            page,
            results,
        } = response;
        dispatch(loadMore(page, results));
    });
};
