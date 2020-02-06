import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBSelect, MDBCol, MDBRow } from "mdbreact";
import { addFilterCondition } from "../../state/ducks/filters/actions.js";


class InputRemoveLabel extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }
  
  handleChange (value) {
    if ( value === '' ) return;
    this.props.addFilterCondition(this.props.index, value)
  }
  
  getOptions () {
    let allOptions = [
      { text: 'IMPORTANT', value: 'IMPORTANT' },
      { text: 'INBOX', value: 'INBOX' },
      { text: 'SPAM', value: 'SPAM' },
      { text: 'UNREAD', value: 'UNREAD' },
    ];
    let options = [];
    const { newFilters } = this.props.filters;
    for (let opt of allOptions) {
      if ( newFilters[ this.props.index ].values.indexOf(opt.text) === -1 ) {
        options.push(opt);
      }
    }
    return options;
  }
  
  render () {
    let options = this.getOptions();
    return (
      <MDBCol bottom className="input-filter">
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
    email: state.email,
    filters: state.filters
  };
}

export default connect(
  mapStateToProps, { addFilterCondition }
)(InputRemoveLabel);

