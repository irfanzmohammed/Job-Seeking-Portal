import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

const DriveDetailsDrawer = ({ drive, onClose }) => {
  return (
    <div className="drive-details-drawer">
      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol lg="8">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <div className="profile-header text-center">
                <MDBTypography tag="h5">{drive.companyName}</MDBTypography>
                <MDBCardText>Job Role: {drive.jobRole}</MDBCardText>
              </div>

              <MDBCardBody className="p-4">
                <MDBTypography tag="h6">Drive Details</MDBTypography>
                <hr className="mt-0 mb-4" />

                <MDBCardText>Company Location: {drive.companyLocation}</MDBCardText>
                <MDBCardText>Conducting College Name: {drive.collegeName}</MDBCardText>
                <MDBCardText>Date of Drive: {drive.dateOfDrive}</MDBCardText>
                <MDBCardText>
                  <strong>Application Link:</strong>{' '}
                  <a href={drive.applicationLink} target="_blank" rel="noopener noreferrer">
                    {drive.applicationLink}
                  </a>
                </MDBCardText>
              </MDBCardBody>

              <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={onClose}>
                  Close
                </button>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default DriveDetailsDrawer;
