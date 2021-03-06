import React from 'react'
import {
  MDBCol,
  MDBCard,
  MDBIcon,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from 'mdbreact';
import {
  CircularProgressbar,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './card-item.css';

const CardItem = props => {
  const {
    imgUrl,
    overview,
    title,
    voteAverage,
    addMovieWishlist,
    removeMovieWishlist,
    hasWishlist,
  } = props;
  const voteAverageSum = voteAverage * 10;
  const onClickWishlist = () => hasWishlist ? removeMovieWishlist() : addMovieWishlist();
  return (
    <MDBCol size="4" className="mb-4 card-item">
      <MDBCard>
        <div className="card-item-photo">
          <button
            className={ `card-item-btn-wishlist ${ hasWishlist ? 'active' : '' }` }
            onClick={ onClickWishlist }
          >
            { hasWishlist ? <MDBIcon icon="heart" /> : <MDBIcon far icon="heart" /> }
          </button>
          <MDBCardImage className="img-fluid" src={ `https://image.tmdb.org/t/p/w500/${imgUrl}` } waves />
          <CircularProgressbar
            value={ voteAverageSum }
            text={`${voteAverageSum}%`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#3f729b",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "rgba(255, 255, 255, .2)"
            })}
          />
        </div>
        <MDBCardBody className="p-3">
          <MDBCardTitle className="m-0">{ title }</MDBCardTitle>
          <MDBCardText>{ overview }</MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

export default CardItem;