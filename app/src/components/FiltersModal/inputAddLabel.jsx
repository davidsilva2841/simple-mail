import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  MDBSelect,
  MDBCol,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from 'mdbreact';
import {addFilterCondition} from '../../features/filtersModal/filtersModalSlice.js';


class InputAddLabel extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }
  
  
  handleChange(value) {
    if ( value === '' ) return;
    this.props.addFilterCondition({
      index: this.props.index,
      value: value,
    });
  }
  
  
  getOptions() {
    let {labels} = this.props.settings;
    const {filters} = this.props.filtersModal;
    
    let options = [];
    for (let i = 0 ; i < labels.length ; i++) {
      if ( filters[ this.props.index ].values.indexOf(labels[ i ].name) ===
          -1 ) {
        options.push({
          value: i.toString(),
          text: labels[ i ].name,
        });
      }
    }
    
    return options;
  }
  
  
  render() {
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


const mapDispatchToProps = {
  addFilterCondition,
};


function mapStateToProps(state) {
  return {
    settings: state.settings,
    filtersModal: state.filtersModal,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(InputAddLabel);

