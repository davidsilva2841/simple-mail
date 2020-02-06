import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBSelect, MDBCol, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from "mdbreact";
import {addFilterCondition} from "../../state/ducks/filters/actions.js";


class InputAddLabel extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }
  
  handleChange (value) {
    if ( value === '' ) return;
    this.props.addFilterCondition(this.props.index, value, true)
  }
  
  getOptions () {
    let { labels } = this.props.user;
    const { newFilters } = this.props.filters;
    
    // User can only remove labels for system filters
    if ( newFilters[ this.props.index ].name === 'removeLabelIds' ) {
      labels = labels.filter(label => label.type === 'system')
    }
    
    let options = [];
    for (let i = 0 ; i < labels.length ; i++) {
      if ( newFilters[ this.props.index ].values.indexOf(labels[ i ].name) === -1 ) {
        options.push({
          value: i.toString(),
          text: labels[ i ].name,
        })
      }
    }
    
    return options;
  }
  
  render () {
    let options = this.getOptions();
    return (
      <MDBCol className="input-filter">
        <MDBSelect
          search
          className="mb-3 mt-0"
          id={ `LabelInputDropDown-${ this.props.index }` }
          options={ options }
          getTextContent={ (value) => this.handleChange(value) }
        />
      </MDBCol>
    );
  }
}


function mapStateToProps (state) {
  return {
    user: state.user,
    filters: state.filters
  };
}

export default connect(
  mapStateToProps, {addFilterCondition}
)(InputAddLabel);

