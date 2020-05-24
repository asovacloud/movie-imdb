import React from 'react'
import {
  MDBCol,
  MDBRow
} from 'mdbreact';

import './main-title.css';

const MainTitle = ({ title }) => {
  return (
    <MDBRow>
      <MDBCol size="12">
        <h2 className="mb-3">{ title }</h2>
      </MDBCol>
    </MDBRow>
  );
};

export default MainTitle;