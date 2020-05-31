import React from 'react'
import {
  MDBCol,
  MDBRow,
} from 'mdbreact';
import CardItem from '../card-item';
import Spinner from '../spinner';
import ReactPaginate from 'react-paginate';

import './card-items-list.css';

const CardItemsList = props => {
  const {
    changeCurrentPage,
    currentPage,
    movieData,
    addMovieWishlist,
    removeMovieWishlist,
    totalPages,
    movieWishlist,
  } = props;
  const movieWishlistIndexList = movieWishlist.map(movie => movie.id);

  const content = movieData.map(({
      id,
      poster_path: imgUrl,
      overview, title,
      vote_average: voteAverage,
      backdrop_path: backdrop,
    }) => {
    const wishlistData = movieData.filter(movie => movie.id === id);
    const hasWishlist = (movieWishlistIndexList.indexOf(id)) !== -1;
    return (
      <CardItem
        key={ id }
        imgUrl={ imgUrl }
        overview={ overview }
        title={ title }
        backdrop={ backdrop }
        voteAverage={ voteAverage }
        removeMovieWishlist={ () => removeMovieWishlist(wishlistData) }
        addMovieWishlist={ () => addMovieWishlist(wishlistData) }
        hasWishlist={ hasWishlist }
      />
    );
  });

  const pagination = <nav className="mt-3 mb-3" aria-label="Page navigation">
    <ReactPaginate
      previousLabel={ '◄' }
      nextLabel={ '►' }
      breakLabel={ '...' }
      pageCount={ totalPages }
      initialPage={ currentPage  - 1}
      marginPagesDisplayed={ 2 }
      pageRangeDisplayed={ 2 }
      onPageChange={ data => changeCurrentPage(data) }
      containerClassName={ 'pagination' }
      pageClassName={ 'page-item' }
      previousClassName={ 'page-item prev' }
      nextClassName={ 'page-item next' }
      breakClassName={ 'page-item' }
      pageLinkClassName={ 'page-link' }
      breakLinkClassName={ 'page-link' }
      previousLinkClassName={ 'page-link' }
      nextLinkClassName={ 'page-link' }
      activeClassName={ 'active' }
    />
  </nav>;

  return (
    <MDBCol size="9" className="card-items-list">
      <MDBRow>
        { movieData.length > 0 ? content : <Spinner /> }
      </MDBRow>

      { pagination }

    </MDBCol>
  );
}

export default CardItemsList;