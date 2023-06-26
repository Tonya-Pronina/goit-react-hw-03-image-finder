import React from 'react';
import css from 'components/Button/Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ onClick }) {
  return (
    <button type="button" className={css.loadMoreBtn} onClick={onClick}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
