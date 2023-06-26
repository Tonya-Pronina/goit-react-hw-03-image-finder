import React from 'react';
import css from 'components/Searchbar/Searchbar.module.css';
import PropTypes from 'prop-types';

export default class Searchbar extends React.Component {
  state = {
    query: '',
  };

  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ query: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { query } = this.state;
    if (query.trim() !== '') {
      this.props.onSubmit(query.trim());
    }
  };

  render() {
    const { query } = this.state;

    return (
      <div className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <input
            className={css.searchFormInput}
            value={query}
            // type="search"
            autoComplete="off"
            autoFocus
            placeholder="Search..."
            onChange={this.handleChange}
          />

          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormLabel}>Search</span>
          </button>
        </form>
      </div>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};
