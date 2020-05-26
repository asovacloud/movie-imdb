import React, { Component } from 'react'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
} from 'mdbreact';
import { API_KEY_3, API_URL } from "../../utils/api";

import './sidebar.css';

class Sidebar extends Component {
  state = {
    genreList: [],
    currentGenre: [],
    languageList: [],
  }

  componentDidMount() {
    fetch(`${ API_URL }/genre/movie/list?api_key=${ API_KEY_3 }`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const newGenreList = data.genres;
        this.setState({ genreList: newGenreList });
      });
    fetch(`${ API_URL }/configuration/languages?api_key=${ API_KEY_3 }`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ languageList: data });
        // this.setState({ genreList: newGenreList });
      });
  }

  toggleGenre(currentGenre, genreList, data, state) {
    const inxCurrentGenre = genreList.findIndex(genre => genre.id === data.id);
    const updateGenreList = [ ...genreList ];
    updateGenreList[inxCurrentGenre].active = state
    return updateGenreList;
  }

  addGenre(data) {
    this.setState(({ currentGenre, genreList  }) => {
      const newGenre = [...currentGenre, data];
      const updateGenreList = this.toggleGenre(currentGenre, genreList, data, true);
      this.props.addGenre(newGenre);
      return {
        currentGenre: newGenre,
        genreList: updateGenreList,
      };
    });
  }

  removeGenre(data) {
    this.setState(({ currentGenre, genreList }) => {
      const newGenre = currentGenre.filter(({ id }) => id !== data.id);
      const updateGenreList = this.toggleGenre(currentGenre, genreList, data, false);
      this.props.addGenre(newGenre);
      return {
        currentGenre: newGenre,
        genreList: updateGenreList,
      };
    });
  }

  onClearFilterSidebar = () => {
    this.setState({ currentGenre: [] });
    this.props.onClearFilter();
  }

  render() {

    const {
      genreList,
      languageList,
    } = this.state;
    const {
      onChangeLanguage,
      onChangeSort,
    } = this.props;

    const genresList = <div className="genre-cloud">
      {
        genreList.map(genre => {
          const { id, name } = genre;
          const isActive = genre.active;
          return (
            <button
              className={ `btn ${ isActive ? 'active' : '' }` }
              key={ id }
              onClick={ isActive ? this.removeGenre.bind(this, genre) : this.addGenre.bind(this, genre) }
            >
              { name }
            </button>
          );
        })
      }
    </div>;

    const selectSortResult = <select
      className="custom-select custom-select-sm"
      onChange={ event => onChangeSort(event.target.value) }
    >
      <option value="popularity.desc">Popularity Descending</option>
      <option value="popularity.asc">Popularity Ascending</option>
      <option value="vote_average.desc">Rating Descending</option>
      <option value="vote_average.asc">Rating Ascending</option>
      <option value="release_date.desc">Release Date Descending</option>
      <option value="release_date.asc">Release Date Ascending</option>
      <option value="original_title.desc">Title (A-Z)</option>
      <option value="original_title.asc">Title (Z-A)</option>
    </select>;

    const selectLanguage = <select
        onChange={ event => onChangeLanguage( event.target.value ) }
        className="custom-select custom-select-sm mb-3"
      >
      { languageList.map(({ iso_639_1, english_name  }) => <option key={ iso_639_1 } value={ iso_639_1 }>{ english_name }</option>) }
    </select>;

    return (
      <MDBCol size="3" className="sidebar">
        <MDBCard className="mb-4">
          <MDBCardHeader className="pl-3 pr-3 pt-2 pb-2" color="unique-color">Filter:</MDBCardHeader>
          <MDBCardBody className="p-3">
            <div  className="mb-3">
              <h6>Sort Results By</h6>
              { selectSortResult }
            </div>

            <div  className="mb-3">
              <h6>Language</h6>
              { selectLanguage }
            </div>

            <div  className="mb-3">
              <h6>Genres</h6>
              { genresList }
            </div>

            <MDBBtn
              onClick={ this.onClearFilterSidebar }
              size="md"
              className="text-center w-100 ml-0 mr-0 mb-0"
            >Clear Filter</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}

export default Sidebar;