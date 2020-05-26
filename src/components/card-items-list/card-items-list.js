import React from 'react'
import {
  MDBCol,
  MDBRow,
  MDBPagination,
  MDBPageItem,
  MDBPageNav,
} from 'mdbreact';
import CardItem from '../card-item';
import Spinner from '../spinner';

import './card-items-list.css';

const CardItemsList = props => {
  const {
    movieData,
    addMovieWishlist,
    removeMovieWishlist,
    movieWishlist,
  } = props;
  const movieWishlistIndexList = movieWishlist.map(movie => movie.id);

  const content = movieData.map(({ id, poster_path: imgUrl, overview, title, vote_average: voteAverage }) => {
    const wishlistData = movieData.filter(movie => movie.id === id);
    const hasWishlist = (movieWishlistIndexList.indexOf(id)) !== -1;
    return (
      <CardItem
        key={ id }
        imgUrl={ imgUrl }
        overview={ overview }
        title={ title }
        voteAverage={ voteAverage }
        removeMovieWishlist={ () => removeMovieWishlist(wishlistData) }
        addMovieWishlist={ () => addMovieWishlist(wishlistData) }
        hasWishlist={ hasWishlist }
      />
    );
  });

  return (
    <MDBCol size="9" className="card-items-list">
      <MDBRow>
        { movieData.length > 0 ? content : <Spinner /> }
      </MDBRow>
      
      <MDBRow>
      <MDBPagination color="blue" className="mt-3 ml-0 mr-0 mb-3">
        <MDBPageItem disabled>
          <MDBPageNav aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active>
          <MDBPageNav>
            1 <span className="sr-only">(current)</span>
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem>
          <MDBPageNav>
            2
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem>
          <MDBPageNav>
            3
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem>
          <MDBPageNav>
            4
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem>
          <MDBPageNav>
            5
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem>
          <MDBPageNav>
            &raquo;
          </MDBPageNav>
        </MDBPageItem>
      </MDBPagination>
      </MDBRow>
    </MDBCol>
  );
}

export default CardItemsList;