import React, { Component } from 'react'
import { MDBContainer } from 'mdbreact';
import Header from '../header';
import {
  Home,
  Wishlist,
  SingleMovie,
  NotFound, } from '../../pages';
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

  isSearchActive = false;

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
    if ( this.isSearchActive ) return;
    if (
      ( prevState.sort_by !== this.state.sort_by )
      || ( prevState.language !== this.state.language )
      || ( prevState.currentGenre !== this.state.currentGenre)
      || ( prevState.currentPage !== this.state.currentPage)
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
      currentPage: 1,
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

  changeCurrentPage = data => {
    const newData = data.selected + 1;
    this.setState({ currentPage: newData, });
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  onSearchSubmit = data => {
    this.isSearchActive = true;
    this.onClearFilter();
    this.isSearchActive = false;
    this.setState({ movieData: data });
  }

  render() {
    const {
      currentGenre,
      currentPage,
      totalPages,
      language,
      sort_by,
      movieData,
      movieWishlist,
    } = this.state;

    return (
      <Router>
        <Header
          wishlistCount={ movieWishlist.length }
          onSearchSubmit={ this.onSearchSubmit }
        />
        <MDBContainer>
          <Switch>
            <Route
              path="/movie-imdb/"
              exact
            >
              <Home
                addGenre={ this.addGenre }
                addMovieWishlist={ this.addMovieWishlist }
                changeCurrentPage={ this.changeCurrentPage }
                currentGenre={ currentGenre }
                currentPage={ currentPage }
                language={ language }
                movieData={ movieData }
                movieWishlist={ movieWishlist }
                removeGenre={ this.removeGenre }
                removeMovieWishlist={ this.removeMovieWishlist }
                sort_by={ sort_by }
                totalPages={ totalPages }
                onChangeSort={ this.onChangeSort }
                onChangeLanguage={ this.onChangeLanguage }
                onClearFilter={ this.onClearFilter }
              />
            </Route>
            <Route
              path="/movie-imdb/wishlist"
              exact
            >
              <Wishlist
                movieWishlist={ movieWishlist }
                removeMovieWishlist={ this.removeMovieWishlist }
              />
            </Route>
            <Route
              path="/movie-imdb/movie/:id"
              render={ ({ match }) => {
                const { id } = match.params;
                return <SingleMovie
                  id={ id }
                  movieWishlist={ movieWishlist }
                  addMovieWishlist={ this.addMovieWishlist }
                  removeMovieWishlist={ this.removeMovieWishlist }
                />
              } }
            />
            <Route component={ NotFound } />
          </Switch>
        </MDBContainer>
        <Footer />
      </Router>
    );
  }
}
