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
    currentPage: 1,
    currentGenre: [],
    language: 'en-US',
    movieData: [],
    movieWishlist: this.thisMovieWishlist,
    sort_by: 'popularity.desc',
    totalPages: 0,
  }

  getMovies() {
    const newGenreIdList = this.state.currentGenre.map(genre => genre.id).join(',');
    const addGenre = newGenreIdList ? `&with_genres=${ newGenreIdList }` : '';
    const url = `${ API_URL }/discover/movie?api_key=${ API_KEY_3 }&sort_by=${ this.state.sort_by }&page=${ this.state.currentPage }&language=${ this.state.language }${ addGenre }`;
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
      || ( prevState.currentGenre !== this.state.currentGenre )
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
    });
  }

  addGenre = data => {
    this.setState(({ currentGenre }) => {
      const newCurrentGenre = [...currentGenre, data];
      return { currentGenre: newCurrentGenre, }
    });
  }

  removeGenre = data => {
    this.setState(({ currentGenre }) => {
      const newCurrentGenre = currentGenre.filter(({ id }) => id !== data.id);
      return { currentGenre: newCurrentGenre, }
    });
  }

  render() {
    const {
      currentGenre,
      language,
      sort_by,
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
                  addGenre={ this.addGenre }
                  addMovieWishlist={ this.addMovieWishlist }
                  currentGenre={ currentGenre }
                  language={ language }
                  movieData={ movieData }
                  movieWishlist={ movieWishlist }
                  removeGenre={ this.removeGenre }
                  removeMovieWishlist={ this.removeMovieWishlist }
                  sort_by={ sort_by }
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
