import React from 'react';
import { MDBTable} from 'mdbreact';
import WishlistHeader from '../components/wishlist-header';
import WishlistContent from '../components/wishlist-content';
import MainTitle from '../components/main-title';

const Wishlist = ({ movieWishlist, removeMovieWishlist }) => {

  return (
    <div className="wishlist">
      <MainTitle title="Wishlist" />
      <MDBTable responsive>
        <WishlistHeader />
        <WishlistContent
          movieWishlist={ movieWishlist }
          removeMovieWishlist={ removeMovieWishlist }
        />
      </MDBTable>
    </div>
  );
};

export default Wishlist;