import React from 'react';
import css from 'components/Modal/Modal.module.css';
import PropTypes from 'prop-types';

export default class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.keyCode === 27 || e.currentTarget === e.target) {
      return this.props.onModalClose();
    }
  };

  render() {
    const { largeImageURL } = this.props;

    return (
      <div className={css.backdrop} onClick={this.handleKeyDown}>
        <div className={css.modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
