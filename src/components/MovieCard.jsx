import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import DEFAULT_POSTER from '../../public/img/default_poster.png';

import styles from './MovieCard.scss';

export default class MovieCard extends Component {
    render() {
        const {
            overview,
            poster,
            title,
            genres,
        } = this.props;
        const POSTER_FULL_PATH = `https://image.tmdb.org/t/p/w500${poster}`;
        return (
            <Card
                className={styles.root}
            >
                <CardMedia
                    overlay={
                        <CardTitle
                            title={title}
                        />
                    }
                >
                    <img
                        alt={title}
                        src={poster !== null ? POSTER_FULL_PATH : DEFAULT_POSTER}
                    />
                </CardMedia>
                {
                    overview &&
                    <CardText>
                        {
                            genres &&
                            <div className={styles.genres}>
                                <span className={styles.genresTitle}>Genres: </span>
                                {genres}
                            </div>
                        }
                        {overview}
                    </CardText>
                }
            </Card>
        );
    }
}
