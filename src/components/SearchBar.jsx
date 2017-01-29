import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ActionSearch from 'material-ui/svg-icons/action/search';

import { fetchSearchMovies, searchMovies } from '../actions';

import styles from './SearchBar.scss';

@connect(undefined, { fetchSearchMovies, searchMovies })
export default class SearchBar extends Component {
    constructor() {
        super();

        this.state = {
            query: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(e) {
        this.setState({
            query: e.target.value,
        });
    }

    handleSearch() {
        this.state.query
        ? this.props.fetchSearchMovies(this.state.query)
        : this.props.searchMovies('');
    }

    render() {
        return (
            <Paper
                className={styles.root}
                zDepth={1}
            >
                <TextField
                    className={styles.input}
                    hintText="Search movie..."
                    underlineShow={false}
                    value={this.state.query}
                    onChange={this.handleChange}
                />
                <FlatButton
                    backgroundColor="#00838F"
                    className={styles.button}
                    hoverColor="#0097A7"
                    icon={<ActionSearch color="#fff" />}
                    onTouchTap={this.handleSearch}
                />
            </Paper>
        );
    }
}
