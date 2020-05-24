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
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=3f4ca4f3a9750da53450646ced312397&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const { results, total_pages  } = data;
        this.setState({
          movieData: results,
          totalPages: total_pages,
        });
      })
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
