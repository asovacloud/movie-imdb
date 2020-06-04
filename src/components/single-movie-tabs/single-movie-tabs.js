import React, { Component } from 'react';
import { API_KEY_3, API_URL } from "../../utils/api";
import {
  MDBContainer,
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
} from "mdbreact";

import './single-movie-tabs.css';

export default class SingleMovieTabs extends Component {
  state = {
    videosData: [],
    postersData: [],
    recomendationsData: [],
    activeItem: '1',
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
        this.setState({ recomendationsData: newData });
        console.log('RECOMENDATIONS newData', newData);
      });
  }

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  componentDidMount() {
    if (!this.props.id) return;
    this.getDataVideos();
    this.getDataPosters();
    this.getDataRecomendations();
  }

  render() {

    const {
      videosData,
      postersData,
      recomendationsData,
    } = this.state;

    const videoContent = (
      <div className="tab-content">
        { videosData.length && videosData.map(({ key }) => {
          return <iframe className="embed-responsive-item" key={ key } src={ "https://www.youtube.com/embed/" + key }></iframe>;
        } ) }
      </div>
    );

    const posterContent = (
      <div className="tab-content">
        { postersData.length && postersData.map(({ file_path: imgURL }, idx) => {
          return <img src={ 'https://image.tmdb.org/t/p/w500' + imgURL } key={ imgURL } alt={ 'poster-' + idx } className="img-fluid img-poster" />
        } ) }
      </div>
    );

    const recomendationsContent = (
      <div className="tab-content">
          { recomendationsData.length && recomendationsData.map(({
            id,
            poster_path: imgURL,
            title,
          }) => {
          return (
            <MDBCard
              className="tab-card-box"
              key={ id }
            >
              {
                imgURL && (
                  <div className="tab-card-box-photo">
                    <img src={ 'https://image.tmdb.org/t/p/w500' + imgURL } alt={ title } className="img-fluid image" />
                  </div>
                )
              }
              <MDBCardTitle>{ title }</MDBCardTitle>
            </MDBCard>
          );
        } ) }
      </div>
    );

    return (
      <div className="single-movie-tabs">
        <h3 className="mb-3">Media</h3>
        <MDBNav className="nav-tabs">
          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >
              Videos
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >
              Posters
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItem === "3"} onClick={this.toggle("3")} role="tab" >
              Recommendations
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent activeItem={this.state.activeItem} >
          <MDBTabPane tabId="1" role="tabpanel">
            { videoContent }
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            { posterContent }
          </MDBTabPane>
          <MDBTabPane tabId="3" role="tabpanel">
            { recomendationsContent }
          </MDBTabPane>
        </MDBTabContent>
      </div>
    );
  }

}
