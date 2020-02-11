import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MDBInputGroup, MDBBtn, MDBCol} from 'mdbreact';
import {addFilterCondition} from '../../features/filtersModal/filtersModalSlice.js';


class InputAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  
  handleChange(value) {
    this.setState({value});
  }
  
  
  handleSubmit(event) {
    event.preventDefault();
    const {value} = this.state;
    if ( value === '' ) return;
    
    this.props.addFilterCondition({
      index: this.props.index,
      value: this.state.value.trim(),
    });
    this.setState({value: ''});
  }
  
  
  render() {
    return (
        <MDBCol className="input-filter">
          <form onSubmit={ event => this.handleSubmit(event) }>
            <MDBInputGroup
                onChange={ event => this.handleChange(event.target.value) }
                value={ this.state.value }
                material
                containerClassName="mb-3 mt-0"
                append={
                  <MDBBtn
                      onClick={ event => this.handleSubmit(event) }
                      className="m-0 px-3 py-2 z-depth-0">
                    Add
                  </MDBBtn>
                }
            />
          </form>
        </MDBCol>
    );
  }
}


export default connect(null, {addFilterCondition})(InputAddress);
