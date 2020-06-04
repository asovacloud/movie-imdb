import React from 'react';
import {
  MDBBtn,
  MDBTableBody
} from 'mdbreact';

import noPhoto from './no_photo.jpg';
import './wishlist-content.css';

const WishlistContent = ({ movieWishlist, removeMovieWishlist }) => {
  const content = movieWishlist.map(({
    id,
    poster_path: poster,
    title,
    vote_average: vote,
  }, inx) => {
      return (
        <tr
          key={ id }
        >
          <td className="align-middle">{ inx + 1 }</td>
          <td>
            <img
              className="wishlist-content-image align-middle" src={ poster ? `https://image.tmdb.org/t/p/w500${ poster }` : noPhoto }
              alt={ title }
            />
          </td>
          <td className="align-middle">{ title }</td>
          <td
            className="text-center align-middle"
          >{ vote }</td>
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
