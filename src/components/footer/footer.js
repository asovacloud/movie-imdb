import React from 'react'
import { MDBRow, MDBCol } from 'mdbreact';

import './footer.css';

const Footer = () => {
  return (
    <MDBRow className="footer">
      <MDBCol
        size="12"
        className="unique-color dark white-text text-center"
        >© 2020 Movie IMDb, LLC. All rights reserved.</MDBCol>
    </MDBRow>
  );
}

export default Footer;