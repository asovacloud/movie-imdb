import React, { Component } from 'react'
import { MDBContainer } from 'mdbreact';
import Header from '../header';
import { Home, Wishlist, NotFound, } from '../../pages';
import Footer from '../footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { API_URL, API_KEY_3 } from '../../utils/api';

import './app.css';

export default class App extends Component {

  thisMovieWishlist = window.localStorage.getItem('movieWishlist')
    ? JSON.parse(window.localStorage.getItem('movieWishlist')) : [];

  state = {
    movieData: [],
    totalPages: 0,
    currentPage: 1,
    sort_by: 'popularity.desc',
    movieWishlist: this.thisMovieWishlist,
    currentGenre: [],
    language: 'en-US',
    genreList: '',
  }

  getMovies() {
    const addGenre = (this.state.genreList) ? `&with_genres=${ this.state.genreList }` : '';
    const url = `${ API_URL }/discover/movie?api_key=${ API_KEY_3 }&sort_by=${ this.state.sort_by }&page=${ this.state.currentPage }&language=${ this.state.language }${ addGenre }`;
    console.log('url:', url);
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const { results, total_pages  } = data;
        this.setState({
          movieData: results,
          totalPages: total_pages,
        });
      });
  }

  componentDidMount() { this.getMovies(); }

  componentDidUpdate(prevProps, prevState) {
    if (
      ( prevState.sort_by !== this.state.sort_by )
      || ( prevState.language !== this.state.language )
      || ( prevState.genreList !== this.state.genreList )
    ) {
      this.getMovies();
    }
  }

  removeMovieWishlist = ([{ id }]) => {
    this.setState(state => {
      const newMovieWishlist = state.movieWishlist.filter(movie => {
        return movie.id !== id;
      });
      window.localStorage.setItem('movieWishlist', JSON.stringify(newMovieWishlist));
      return {
        movieWishlist: newMovieWishlist,
      }
    });
  }

  addMovieWishlist = data => {
    this.setState(state => {
      const newMovieWishlist = [...state.movieWishlist, ...data];
      window.localStorage.setItem('movieWishlist', JSON.stringify(newMovieWishlist));
      return { movieWishlist: newMovieWishlist, }
    });
  }

  addGenre = genreList => {
    const newGenreIdList = genreList.map(genre => genre.id).join(',');
    this.setState({ genreList: newGenreIdList });
  }

  onChangeSort = sort_by => {
    this.setState({ sort_by });
  }

  onChangeLanguage = language => {
    this.setState({ language });
  }

  onClearFilter = () => {
    this.setState({
      sort_by: 'popularity.desc',
      currentGenre: [],
      language: 'en-US',
      genreList: '',
    });
  }

  render() {
    const {
      movieData,
      movieWishlist,
    } = this.state;
    return (
      <Router>
        <Header wishlistCount={ movieWishlist.length } />
        <Switch>
          <>
            <MDBContainer>
              <Route
                path="/"
                exact
              >
                <Home
                  movieData={ movieData }
                  movieWishlist={ movieWishlist }
                  addMovieWishlist={ this.addMovieWishlist }
                  removeMovieWishlist={ this.removeMovieWishlist }
                  addGenre={ this.addGenre }
                  onChangeSort={ this.onChangeSort }
                  onChangeLanguage={ this.onChangeLanguage }
                  onClearFilter={ this.onClearFilter }
                />
              </Route>
              <Route path="/wishlist">
                <Wishlist
                  movieWishlist={ movieWishlist }
                  removeMovieWishlist={ this.removeMovieWishlist }
                />
              </Route>
              <Route path="/not-found">
                <NotFound />
              </Route>
            </MDBContainer>
          </>
        </Switch>
        <Footer />
      </Router>
    );
  }
}
