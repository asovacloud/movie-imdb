import React, { Component } from 'react';
import {API_KEY_3, API_URL} from "../utils/api";
import {
  MDBCol,
  MDBRow,
} from 'mdbreact';
import SingleMovieBackgroundPoster from '../components/single-movie-background-poster';
import SingleMovieTabs from '../components/single-movie-tabs';
import SingleMovieRecomendations from '../components/single-movie-recomendations';

export default class SingleMovie extends Component {
  state = {
    movieData: {},
  }

  componentDidMount() {
    const url = `${ API_URL }/movie/${ this.props.id }?api_key=${ API_KEY_3 }&language=en-US`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ movieData: data });
      });
  }

  checkHasWishlist = () => {
    if (!this.state.movieData.id) return false;
    const wishlistData = this.props.movieWishlist.filter(movie => movie.id === this.state.movieData.id);
    return wishlistData.length > 0;
  }

  convertNumber(number) {
    return number.toString().split('').reverse().join('').match(/.{1,3}/g).reverse()
      .map(item => item.toString().split('').reverse().join('')).join() + '.00'
  }

  render() {

    const {
      backdrop_path: backdrop,
      budget,
      genres,
      homepage: link,
      original_language: language,
      overview,
      poster_path: poster,
      release_date: releaseDate,
      revenue,
      runtime,
      status,
      tagline,
      title: name,
      vote_average: vote,
      // production_companies: productionCompanies
    } = this.state.movieData;

    const {
      id,
      addMovieWishlist,
      removeMovieWishlist,
    } = this.props;

    console.log(this.state.movieData);
    console.log('movieWishlist', this.props.movieWishlist);

    const factsInfo = (
      <ul className="facts-info">
        <li><strong className="facts-info__title">Status</strong><span className="facts-info__text">{ status }</span></li>
        <li><strong className="facts-info__title">Original Language</strong><span className="facts-info__text">{ language && language.toUpperCase() }</span></li>
        <li><strong className="facts-info__title">Budget</strong><span className="facts-info__text">$ { budget && this.convertNumber(budget) }</span></li>
        <li><strong className="facts-info__title">Revenue</strong><span className="facts-info__text">$ { revenue && this.convertNumber(revenue) }</span></li>
      </ul>
    );

    return (
      <>
        <SingleMovieBackgroundPoster
          addMovieWishlist = { () => addMovieWishlist([this.state.movieData]) }
          backdrop = { backdrop }
          genres = { genres }
          link = { link }
          language = { language }
          overview = { overview }
          poster = { poster }
          releaseDate = { releaseDate }
          removeMovieWishlist = { () => removeMovieWishlist([this.state.movieData]) }
          runtime = { runtime }
          tagline = { tagline }
          name = { name }
          vote = { vote }
          hasWishlist = { this.checkHasWishlist }
        />
        <MDBRow>
          <MDBCol md="9">
            <SingleMovieTabs
              id={ id }
            />
          </MDBCol>
          <MDBCol md="3">
            { factsInfo }
          </MDBCol>
        </MDBRow>
        <SingleMovieRecomendations />
      </>
    );
  }
};