import React from 'react';
import MainTitle from '../components/main-title';
import Sidebar from '../components/sidebar';
import CardItemsList from '../components/card-items-list';
import { MDBRow } from 'mdbreact';

const Home = ({
                movieData,
                movieWishlist,
                addMovieWishlist,
                removeMovieWishlist,
                addGenre,
                onChangeSort,
                onChangeLanguage,
                onClearFilter,
              }) => {
  return (
    <>
      <MainTitle title="Films" />
      <MDBRow>
        <Sidebar
          addGenre={ addGenre }
          onChangeSort={ onChangeSort }
          onChangeLanguage={ onChangeLanguage }
          onClearFilter={ onClearFilter }
        />
        <CardItemsList
          movieData={ movieData }
          addMovieWishlist={ addMovieWishlist }
          removeMovieWishlist={ removeMovieWishlist }
          movieWishlist={ movieWishlist }
        />
      </MDBRow>
    </>
  );
};

export default Home;