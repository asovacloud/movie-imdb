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
      addGenre,
      currentGenre,
      language,
      sort_by,
      removeGenre,
      onChangeLanguage,
      onChangeSort,
    } = this.props;

    const currentGenreIdList = currentGenre.map(item => item.id);

    const genresListContent = (
      <div className="genre-cloud">
        {
          genreList.map(genre => {
            const { id, name } = genre;
            const isActive = currentGenreIdList.indexOf(id) !== -1;
            return (
              <button
                className={ `btn ${ isActive ? 'active' : '' }` }
                key={ id }
                onClick={ () => isActive ? removeGenre(genre) : addGenre(genre)  }
              >
                  { name }
              </button>
            );
          })
        }
      </div>
    );

    const selectSortResult = <select
      className="custom-select custom-select-sm"
      onChange={ event => onChangeSort(event.target.value) }
      value={ sort_by }
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
        value={ language }
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
              { genresListContent }
            </div>

            <MDBBtn
              onClick={ this.onClearFilterSidebar }
              size="md"
              className="text-center w-100 ml-0 mr-0 mb-0 clear-filter"
            >Clear Filter</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}

export default Sidebar;