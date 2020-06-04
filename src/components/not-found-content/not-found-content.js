import React from 'react';
import img1 from './img/image-asset.jpeg';

import './not-found-content.css';

const NotFoundContent = () => {
  return (
    <div className="not-found">
      <div className="not-found__col-image">
        <img src={ img1 } alt="Logo" />
      </div>

      <div className="not-found__col-text text-center">
        <h1>AWWW...DON’T CRY.</h1>
        <p>It's just a 404 Error!<br />What you’re looking for may have been misplaced in Long Term Memory.</p>
      </div>

    </div>
  );
};

export default NotFoundContent;
