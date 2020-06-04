import React from 'react';

import './wishlist-header.css';
import { MDBTableHead } from 'mdbreact';

const WishlistHeader = () => {
  return (
    <MDBTableHead color="unique-color" textWhite>
      <tr>
        <th>#</th>
        <th>Image</th>
        <th>Title</th>
        <th
          className="text-center"
          style={{ whiteSpace: "nowrap" }}
        ><span className="text-warning">&#9733;</span> Rating</th>
        <th className="red-text text-center">Reject</th>
      </tr>
    </MDBTableHead>
  );
};

export default WishlistHeader;
