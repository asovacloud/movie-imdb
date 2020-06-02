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
import { withRouter } from 'react-router-dom';

import noPhoto from './no_photo.jpg';
import 'react-circular-progressbar/dist/styles.css';
import './card-item.css';

const CardItem = props => {
  const {
    backdrop,
    history,
    imgUrl,
    id,
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
          <div
            className="card-item-photo-holder"
            onClick={ () => history.push(`/movie/${ id }`) }
          >
            <MDBCardImage className="img-fluid" src={ imgUrl ? `https://image.tmdb.org/t/p/w500/${imgUrl}` : noPhoto } waves />
            <MDBCardImage className="img-fluid img-fixed" src={ backdrop ? `https://image.tmdb.org/t/p/w500/${ backdrop }` : noPhoto } waves />
          </div>
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

export default withRouter(CardItem);