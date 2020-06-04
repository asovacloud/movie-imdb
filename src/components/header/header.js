import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline,
  MDBBadge,
} from "mdbreact";
import { withRouter } from 'react-router-dom';
import { ReactComponent as Logo } from './logo.svg';

import './header.css';
import {API_KEY_3, API_URL} from "../../utils/api";

class NavbarPage extends Component {
  state = {
    isOpen: false,
    searchValue: '',
  };
  
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onValueChange = event => {
    this.setState({ searchValue: event.target.value });
  }

  render() {

    const { searchValue } = this.state;

    const {
      history,
      wishlistCount
    } = this.props;

    const addBage = wishlistCount ? <MDBBadge color="danger" className="ml-2">{ wishlistCount }</MDBBadge> : '';
    return (
      <MDBNavbar className="header mb-4" color="unique-color" dark expand="md">
        <MDBNavbarBrand>
          <div
            className="logo-holder"
            onClick={ () => history.push('/') }
          >
            <Logo />
          </div>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink exact to="/">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink exact to="/wishlist">Wishlist { addBage }</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBFormInline
                onSubmit={ event => {
                  event.preventDefault();
                  history.push('/');
                  const url = `${ API_URL }/search/movie?api_key=${ API_KEY_3 }&language=en-US&query=${ this.state.searchValue }&page=1`;
                  this.setState({ searchValue: '' });

                  fetch(url)
                    .then(response => {
                      return response.json();
                    })
                    .then(data => {
                      this.props.onSearchSubmit(data.results);
                    });

                } }
                waves
              >
                <div className="md-form my-0">
                  <input
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    value={ searchValue }
                    onChange={ this.onValueChange }
                  />
                </div>
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      );
  }
}

export default withRouter(NavbarPage);