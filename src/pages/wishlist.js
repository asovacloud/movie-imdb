import React from 'react';
import { MDBTable} from 'mdbreact';
import WishlistHeader from '../components/wishlist-header';
import WishlistContent from '../components/wishlist-content';

const Wishlist = ({ movieWishlist, removeMovieWishlist }) => {

  return (
    <div className="wishlist">
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