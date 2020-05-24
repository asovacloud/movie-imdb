import React from 'react';
import { MDBBtn, MDBTableBody } from 'mdbreact';

import './wishlist-content.css';

const WishlistContent = ({ movieWishlist, removeMovieWishlist }) => {
  const content = movieWishlist.map(({
    id,
    poster_path,
    title,
    vote_average,
  }, inx) => {
      return (
        <tr
          key={ id }
        >
          <td className="align-middle">{ inx + 1 }</td>
          <td>
            <img
              className="wishlist-content-image align-middle"
              src={ `https://image.tmdb.org/t/p/w500${poster_path}` }
              alt={ title }
            />
          </td>
          <td className="align-middle">{ title }</td>
          <td
            className="text-center align-middle"
          >{ vote_average }</td>
          <td
            className="text-center align-middle"
          >
            <MDBBtn
              size="sm"
              color="red"
              className="text-center m-0"
              onClick={ () => removeMovieWishlist([{ id }]) }
            >Reject</MDBBtn>
          </td>
        </tr>
      );
    });
  return (
    <MDBTableBody>
      { content }
    </MDBTableBody>
  );
};

export default WishlistContent;