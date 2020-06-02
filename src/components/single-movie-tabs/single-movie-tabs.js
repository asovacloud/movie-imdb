import React, { Component } from 'react';
import {API_KEY_3, API_URL} from "../../utils/api";

import './single-movie-tabs.css';

export default class SingleMovieTabs extends Component {
  state = {
    videosData: [],
    posterssData: [],
  }

  getDataVideos = () => {
    const url = `${ API_URL }/movie/${ this.props.id }/videos?api_key=${ API_KEY_3 }`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const newData = data.results;
        this.setState({ videosData: newData });
        console.log('TABS newData', newData);
      });
  }

  getDataPosters = () => {
    const url = `${ API_URL }/movie/${ this.props.id }/images?api_key=${ API_KEY_3 }`;
    fetch(url)
      .then(response => {
        return response.json();
      })
        .then(data => {
        const newData = data.backdrops;
        this.setState({ postersData: newData });
        console.log('POSTERS newData', newData);
      });
  }

  getDataRecomendations = () => {
    const url = `${ API_URL }/movie/${ this.props.id }/recommendations?api_key=${ API_KEY_3 }&language=en-US&page=1`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const newData = data.results;
        this.setState({ postersData: newData });
        console.log('RECOMENDATIONS newData', newData);
      });
  }



  componentDidMount() {
    if (!this.props.id) return;
    this.getDataVideos();
    this.getDataPosters();
    this.getDataRecomendations();
  }

  render() {
    return (
      <>
        <h3>Media</h3>
        <p>Single movie tabs</p>
        <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/jKCj3XuPG8M"></iframe>
      </>
    );
  }

}
