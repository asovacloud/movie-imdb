import React from 'react'
import { MDBInput, MDBFormInline,
  MDBCard, MDBCardBody, MDBCardHeader, MDBBtn, MDBCol,
  MDBPagination, MDBPageItem, MDBPageNav,
} from 'mdbreact';

import './sidebar.css';

const Sidebar = () => {
  return (
    <MDBCol size="3" className="sidebar">
      <MDBCard className="mb-4">
        <MDBCardHeader className="pl-3 pr-3 pt-2 pb-2" color="unique-color">Filter:</MDBCardHeader>
        <MDBCardBody className="p-3">
          <div  className="mb-3">
            <h6>Sort Results By</h6>
            <select className="custom-select custom-select-sm">
              <option defaultValue>Sort Results By</option>
              <option value="1">Popularity Descending</option>
              <option value="2">Popularity Ascending</option>
              <option value="3">Rating Descending</option>
              <option value="3">Rating Ascending</option>
              <option value="3">Release Date Descending</option>
              <option value="3">Release Date Ascending</option>
              <option value="3">Title (A-Z)</option>
              <option value="3">Title (Z-A)</option>
            </select>
          </div>
          
          <h6>Language</h6>
          <select className="custom-select custom-select-sm mb-3">
            <option defaultValue>None Selected</option>
            <option value="1">English (321,299)</option>
            <option value="2">German (1 321,299)</option>
          </select>
          <h6>Genres</h6>
          <MDBFormInline className="mb-3">
            <MDBInput
              label='Action'
              type='checkbox'
              id='checkbox1'
            />
            <MDBInput
              label='Adventure'
              type='checkbox'
              id='checkbox2'
            />
            <MDBInput
              label='Animation'
              type='checkbox'
              id='checkbox3'
            />
          </MDBFormInline>
          {/* <MDBBtn size="sm" className="text-center w-100 m-0"></MDBBtn> */}
          <MDBBtn size="md" className="text-center w-100 ml-0 mr-0 mb-0">Clear Filter</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

export default Sidebar;