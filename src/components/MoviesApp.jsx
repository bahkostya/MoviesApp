import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import ReactScrollPagination from 'react-scroll-pagination';

import SearchBar from './SearchBar.jsx';
import MoviesGrid from './MoviesGrid.jsx';

import { fetchLoadMore } from '../actions';

import styles from './MoviesApp.scss';

@connect(mapStateToProps, { fetchLoadMore })
export default class MoviesApp extends Component {
    constructor() {
        super();

        this.loadNextPage = this.loadNextPage.bind(this);
    }

    loadNextPage() {
        const { currentPage, currentQuery, fetchLoadMore, isLoading } = this.props;
        const nextPage = currentPage + 1;
        if (isLoading) {
            return;
        }

        fetchLoadMore(currentQuery, nextPage);
    }

    render() {
        return (
            <div className={styles.root}>
                <SearchBar />
                <MoviesGrid />
                {
                    this.props.isLoading &&
                    <CircularProgress size={40} thickness={7} />
                }
                <ReactScrollPagination
                    fetchFunc={this.loadNextPage}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.isLoading,
        currentPage: state.currentPage,
        pagesTotal: state.pagesTotal,
        currentQuery: state.currentQuery,
    };
}
