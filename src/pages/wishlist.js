import React from 'react';
import { MDBTable} from 'mdbreact';
import WishlistHeader from '../components/wishlist-header';
import WishlistContent from '../components/wishlist-content';
import MainTitle from '../components/main-title';

const Wishlist = ({ movieWishlist, removeMovieWishlist }) => {

  const tableWishlist = <MDBTable responsive>
    <WishlistHeader />
    <WishlistContent
      movieWishlist={ movieWishlist }
      removeMovieWishlist={ removeMovieWishlist }
    />
  </MDBTable>;

  const noWishlist = <p>Oops. Could you add some movie to the Wishlist?</p>;

  return (
    <div className="wishlist">
      <MainTitle title="Wishlist" />
      { movieWishlist.length > 0 ? tableWishlist : noWishlist }
    </div>
  );
};

export default Wishlist;
