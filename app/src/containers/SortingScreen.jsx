import React, {Component} from 'react';
import {MDBContainer} from 'mdbreact';

import FiltersModal from '../components/FiltersModal/FiltersModal';
import CurrentFiltersTable
  from '../components/CurrentFiltersTable/CurrentFiltersTable';


class SortingScreen extends Component {
  render() {
    return (
        <MDBContainer fluid>
          <FiltersModal/>
          <CurrentFiltersTable/>
        </MDBContainer>
    );
  }
}


export default SortingScreen;
