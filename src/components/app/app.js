import React, { Component } from 'react'
import { MDBInput, MDBFormInline,
  MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer, MDBRow, MDBCol,
  MDBCardImage,
  MDBIcon,
  MDBPagination, MDBPageItem, MDBPageNav,
} from 'mdbreact';
import Header from '../header';
import MainTitle from '../main-title';
import Sidebar from '../sidebar';
import CardItemsList from '../card-items-list';
import Footer from '../footer';

import './app.css';

export default class App extends Component {

  state = {
    movieData: [],
    totalPages: 0,
    currentPage: 1,
    sort_by: 'popularity.desc',
    movieWishlist: [],
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
      return {
        movieWishlist: newMovieWishlist,
      }
    });
  }

  addMovieWishlist = data => {
    this.setState(state => {
      const newMovieWishlist = [...state.movieWishlist, ...data];
      return { movieWishlist: newMovieWishlist, }
    });
  }

  render() {
    const {
      movieData,
      movieWishlist,
    } = this.state;
    return (
      <>
        <Header wishlistCount={ movieWishlist.length } />
        <MDBContainer>
          <MainTitle />
          <MDBRow>
            <Sidebar />
            <CardItemsList
              movieData={ movieData }
              addMovieWishlist={ this.addMovieWishlist }
              removeMovieWishlist={ this.removeMovieWishlist }
              movieWishlist={ movieWishlist }
            />
          </MDBRow>
        </MDBContainer>
        <Footer />
      </>
    );
  }
}