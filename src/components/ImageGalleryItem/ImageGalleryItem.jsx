import React from 'react';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ hit, onClick }) {
  const { largeImageURL, webformatURL } = hit;

  return (
    <li className={css.item}>
      <img
        className={css.image}
        src={webformatURL}
        alt=""
        onClick={() => onClick(largeImageURL)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  hit: PropTypes.exact({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
