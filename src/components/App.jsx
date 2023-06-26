import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { FetchImages } from './FetchImages';

export default class App extends React.Component {
  state = {
    query: null,
    hits: [],
    page: 1,
    per_page: 12,
    totalPages: 0,
    loading: false,
    showModal: false,
    currentLargeImageURL: '',
    error: {
      status: false,
      message: '',
    },
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.handleFetchImg();
    }
  }

  handleFetchImg = async () => {
    const { query, page, per_page } = this.state;

    try {
      this.setState({ loading: true });
      const data = await FetchImages(query, page, per_page);

      if (data.hits.length === 0) {
        this.setState({
          error: {
            status: true,
            message: `There are no images matching ${query}, try again.`,
          },
        });
        return;
      }
      const totalPages = Math.ceil(data.totalHits / per_page);

      this.setState(prevState => {
        return {
          hits: [...prevState.hits, ...data.hits],
          totalPages,
        };
      });
    } catch (error) {
      this.setState({
        error: {
          status: true,
          message: 'Something went wrong! Please try again later!',
        },
      });
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleSubmit = query => {
    if (query !== this.state.query) {
      this.setState({
        hits: [],
        query,
        page: 1,
        error: {
          status: false,
          message: '',
        },
      });
    }
  };

  handleModal = url => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      currentlargeImageURL: url,
    }));
  };

  render() {
    const { hits, page, totalPages, loading, error, currentlargeImageURL } =
      this.state;
    const isBtnVisible = hits.length > 0 && page < totalPages && !loading;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {error.status && !loading && error.message}
        {hits.length > 0 && (
          <ImageGallery hits={hits} onClick={this.handleModal} />
        )}
        {loading && <Loader />}
        {isBtnVisible && <Button onClick={this.handleLoadMore} />}
        {currentlargeImageURL && (
          <Modal
            largeImageURL={currentlargeImageURL}
            onModalClose={this.handleModal}
          />
        )}
      </div>
    );
  }
}
