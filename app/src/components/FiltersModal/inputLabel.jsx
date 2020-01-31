import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBSelect, MDBCol } from "mdbreact";
import {addFilterCondition} from "../../actions";


class InputLabel extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }
  
  handleChange (value) {
    if (value === '') return;
    this.props.addFilterCondition(this.props.index, value)
  }
  
  getOptions () {
    const {labels} = this.props.email;
    const {newFilters} = this.props.filters;
    
    let options = [];
    for (let i = 0 ; i < labels.length ; i++) {
      if (newFilters[this.props.index].values.indexOf(labels[i].name) === -1) {
        options.push({
          value: i.toString(),
          text: labels[i].name,
        })
      }
    }
  
    return options;
  }
  
  render () {
    let options = this.getOptions();
    return (
      <MDBCol>
        <MDBSelect
          search
          className="mb-3 mt-0"
          id={`LabelInputDropDown-${this.props.index}`}
          options={options}
          getTextContent={(value) => this.handleChange(value)}
        />
      </MDBCol>
    );
  }
}


function mapStateToProps (state) {
  return {
    email: state.email,
    filters: state.filters
  };
}

export default connect(
  mapStateToProps, {addFilterCondition}
)(InputLabel);

