import React from 'react';
import MainTitle from '../components/main-title';
import Sidebar from '../components/sidebar';
import CardItemsList from '../components/card-items-list';
import { MDBRow } from 'mdbreact';

const Home = ({
                addGenre,
                addMovieWishlist,
                currentGenre,
                language,
                movieData,
                movieWishlist,
                removeGenre,
                removeMovieWishlist,
                sort_by,
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
          currentGenre={ currentGenre }
          language={ language }
          sort_by={ sort_by }
          removeGenre={ removeGenre }
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