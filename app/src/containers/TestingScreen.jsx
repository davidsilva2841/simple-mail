import React, {Component} from 'react';
import {MDBContainer} from 'mdbreact';
// import {getLabelsFilters, getEmails} from "../state/ducks/user/actions";
import MDBSortable from "mdb-react-sortable";
import {connect} from 'react-redux';
import CurrentLabels from '../components/CurrentLabels/currentLabels.jsx';


const Item = props => `Item ${props.title}`;

class TestingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      
    };
    this.state.renderedItems = this.state.items.map(item => {
      return <Item title={item} />;
    });
  }
  
  
  render() {
    return (
        <MDBContainer >
          {/*<div>*/}
          {/*  <MDBSortable*/}
          {/*      axis="y"*/}
          {/*      items={this.state.renderedItems}*/}
          {/*      itemClassName="SortableItem"*/}
          {/*  />*/}
          {/*</div>*/}
          <CurrentLabels/>
        </MDBContainer>
    );
  }
}


function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {},)(TestingScreen);
