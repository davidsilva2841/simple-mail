import React, {Component} from 'react';
import {MDBBox, MDBContainer} from 'mdbreact';
import CurrentLabels from '../components/currentLabels';
import FiltersModal from '../components/FiltersModalOld/FiltersModal';
import CurrentFiltersTable
  from '../components/CurrentFiltersTable/CurrentFiltersTable';


class MailScreen extends Component {
  
  render() {
    return (
        <MDBContainer fluid id="mail-screen">
          {/*<CurrentLabels/>*/ }
          <FiltersModal/>
          <CurrentFiltersTable/>
        </MDBContainer>
    
    );
  }
}


export default MailScreen;
