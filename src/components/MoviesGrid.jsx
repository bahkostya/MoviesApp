import React, { Component } from 'react';
import { connect } from 'react-redux';

import Masonry from 'react-masonry-component';
import MovieCard from './MovieCard.jsx';

import styles from './MoviesGrid.scss';

@connect(mapStateToProps)
export default class MoviesGrid extends Component {
    render() {
        const masonryOptions = {
            columnWidth: 270,
            gutter: 30,
            isFitWidth: true,
        };
        return (
            <Masonry
                className={styles.root}
                options={masonryOptions}
            >
                {
                    this.props.movies.map(movie =>
                        <MovieCard
                            genres={movie.genreNames}
                            id={movie.id}
                            key={movie.id}
                            overview={movie.overview}
                            poster={movie.poster_path}
                            title={movie.title}
                        />,
                    )
                }
            </Masonry>
        );
    }
}

function mapStateToProps(state) {
    return {
        movies: state.movies.moviesList,
    };
}
