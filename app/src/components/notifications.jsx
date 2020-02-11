import React from 'react';
import {MDBToastContainer, MDBToast} from 'mdbreact';


const test = () => {
  MDBToast.info('test', {
    position: 'top-right',
    autoClose: 5000,
    closeButton: true,
  });
};

const Notifications = (props) => {
  return (
      <MDBToastContainer
          position="top-right"
          autoClose={ 5000 }
          closeButton={ false }
          hideProgressBar={ true }
          newestOnTop
          rtl={ false }
          draggable={ false }
          pauseOnHover={ true }>
      </MDBToastContainer>
  );
  
};

export default Notifications;


