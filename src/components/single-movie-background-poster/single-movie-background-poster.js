import React from 'react';
import {MDBBtn, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import {
  CircularProgressbar,
  buildStyles,
} from 'react-circular-progressbar';
import Spinner from '../spinner';

import 'react-circular-progressbar/dist/styles.css';
import './single-movie-background-poster.css';
import noPhoto from './no_photo.jpg';

const SingleMovieBackgroundPoster = props => {
  const {
    addMovieWishlist,
    backdrop,
    genres,
    hasWishlist,
    link,
    language,
    overview,
    poster,
    releaseDate,
    removeMovieWishlist,
    runtime,
    tagline,
    name,
    vote,
  } = props;

  const IMG_URL = 'https://image.tmdb.org/t/p/';

  const voteAverageSum = vote * 10;
  let genreLi = Boolean(genres) && genres.map((item, idx) => (<li key={ idx }>{ item.name }</li>))
  const dateYear = releaseDate && releaseDate.split('').slice(0, 4).join('');
  const runtimeContent = () => {
    const minutesPerHour = runtime / 60;
    const roundedRuntime = Math.floor(minutesPerHour);
    const getTime = runtime - ( roundedRuntime * 60 );
    return `${ Math.floor( roundedRuntime ) }h ${ Math.abs( getTime ) }m`
  }

  const getFormattedDate = () => {
    const date = new Date(releaseDate);
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'numeric', day: '2-digit' })
    const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date )

    return `${day}/${month}/${year }`;
  }

  const linkContent = (
    (link) && <div className="background-poster__link">
      <a
        target="_blank"
        href={ link }
      >Link to site</a>
    </div>
  );

  const chartContent = (
    <>
      <CircularProgressbar
        value={ voteAverageSum }
        text={`${ voteAverageSum }%`}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: "#3f729b",
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "rgba(255, 255, 255, .2)"
        })}
      />
      <div className='title'>User<br />score</div>
    </>
  );

  const onClickWishlist = () => hasWishlist() ? removeMovieWishlist() : addMovieWishlist();

  return (
    <div
      className={`background-poster ${!backdrop && 'no-poster'}`}
      style={ backdrop && { backgroundImage: `url( https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${ backdrop } )` }}
    >
      <MDBContainer>
        { (!name) &&
          <MDBRow className="pt-5 pb-5 align-items-center">
            <MDBCol md="12">
              <Spinner />
            </MDBCol>
          </MDBRow>
        }
        { (name) &&
          <MDBRow className="pt-5 pb-5 align-items-center">
            <MDBCol md="4">
              <a
                href={ (link) ? link : ''  }
                target="_blank"
              >
                <MDBCardImage className="img-fluid" src={ poster ? `${ IMG_URL }w500/${ poster }` : noPhoto } waves />
              </a>
            </MDBCol>
            <MDBCol md="8" className="background-poster__container-col">
              <h2 className="background-poster__title mb-1">
                { name }
                <span className="background-poster__release-date font-weight-lighter font-italic"> ({ dateYear })</span>
              </h2>
              <div className="background-poster__title-info mb-2">
                <span className="background-poster__date">{ releaseDate && getFormattedDate() }</span>
                <span className="background-poster__language"> ({ language && language.toUpperCase() })</span>
                <ul className="genres">
                  { genreLi }
                </ul>
                <span className="runtime">{ runtimeContent() }</span>
              </div>
              <ul className="background-poster__meta">
                <li className="chart">
                  { chartContent }
                </li>
                <li>
                  <button
                    className={ `card-item-btn-wishlist ${ hasWishlist() ? 'active' : '' }` }
                    onClick={ onClickWishlist }
                  >
                    { hasWishlist() ? <MDBIcon icon="heart" /> : <MDBIcon far icon="heart" /> }
                  </button>
                </li>
              </ul>
              <div className="background-poster__tagline">{ tagline }</div>
              <div className="background-poster__description">
                <h3>{ name }</h3>
                <p>{ overview }</p>
              </div>
              { linkContent }
            </MDBCol>
          </MDBRow>
        }
      </MDBContainer>
    </div>
  );
};

export default SingleMovieBackgroundPoster;
