const API_PREFIX = 'https://api.themoviedb.org/3';
const API_KEY = '9b78924535a617c34b8dfa89b3875d72';

function searchMovies(query, page = 1) {
    const fetchOptions = {
        method: 'GET',
        mode: 'cors',
    };

    return query && fetch(`${API_PREFIX}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&include_adult=false`, fetchOptions)
        .then(response => response.json());
}

function getGenres() {
    const fetchOptions = {
        method: 'GET',
        mode: 'cors',
    };

    return fetch(`${API_PREFIX}/genre/movie/list?api_key=${API_KEY}`, fetchOptions)
        .then(response => response.json());
}

export default {
    searchMovies,
    getGenres,
};
