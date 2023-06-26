import React from 'react';
import css from 'components/ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ hits, onClick }) {
  return (
    <ul className={css.gallery}>
      {hits.map(hit => {
        return <ImageGalleryItem key={hit.id} hit={hit} onClick={onClick} />;
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      onClick: PropTypes.func.isRequired,
    }).isRequired
  ).isRequired,
};
