import React, { Component } from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBRow,
} from 'mdbreact';
import FilterColumn from "./filterColumn";


class Modal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      filters: [
        { index: 0, title: 'Sent to', name: 'to', values: [], value: '', type: 'address' },
        { index: 1, title: 'From', name: 'from', values: [], value: '', type: 'address' },
        { index: 2, title: 'Add Label', name: '', values: [], value: '', type: 'label', ids: [] },
        { index: 3, title: 'Remove Label', name: '', values: [], value: '', type: 'label', ids: [] }
      ]
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDropDown = this.handleDropDown.bind(this);
    this.handleDeleteLabel = this.handleDeleteLabel.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  
  // --------------------------------------------------------------------------------------------------
  /**
   * Handles text input changes for input field
   * @param event
   * @param index
   * @param value
   */
  handleChange (event, index, value) {
    event.preventDefault();
    const { filters } = this.state;
    filters[ index ].value = value;
    this.setState({ filters });
  }
  
  
  /**
   * Handles submitting input from address field
   * @param event
   * @param index
   * @param value
   */
  handleSubmit (event, index, value) {
    event.preventDefault();
    if ( !value ) return;
    
    const { filters } = this.state;
    // If item already exists
    if (filters[ index ].values.indexOf(value) !== -1) return;
    filters[ index ].values.push(value);
    filters[ index ].value = '';
    this.setState({ filters });
  }
  
  
  /**
   * Handles drop down selection
   * @param option {object}
   * @param index
   */
  handleDropDown (option, index) {
    if ( !option ) return;
    
    const { filters } = this.state;
    // If item already exists
    if (filters[ index ].values.indexOf(option.text) !== -1) return;
    
    // Adding item
    filters[ index ].values.push(option.text);
    filters[ index ].ids.push(option.id);
    this.setState({ filters });
  }
  
  
  /**
   * Handles deleting a label
   * @param index {number}
   * @param deleteValue {string}
   */
  handleDeleteLabel (index, deleteValue) {
    const { filters } = this.state;
    if ( filters[ index ].type === 'label' ) {
      let deleteIndex = filters[ index ].values.indexOf(deleteValue);
      filters[ index ].ids.splice(deleteIndex, 1);
    }
    filters[ index ].values = filters[ index ].values.filter(value => value !== deleteValue);
    this.setState({ filters });
  }
  
  
  /**
   * Resets filter settings
   */
  handleReset () {
    const { filters } = this.state;
    
    for(let filter of filters) {
    	if (filter.type === 'label') filter.ids = [];
      filter.values = [];
    }
    this.setState({ filters });
  }
  
  // --------------------------------------------------------------------------------------------------
  
  
  render () {
    const { filters } = this.state;
    
    
    return (
      <MDBContainer id="new-filter-modal">
        <MDBModal size="fluid" isOpen={ this.props.modal } toggle={ () => this.props.toggle() }>
          
          {/* Header */ }
          <MDBModalHeader toggle={ () => this.props.toggle() }>New Filter</MDBModalHeader>
          
          {/* Filter content */ }
          <MDBModalBody>
            <MDBContainer fluid>
              <MDBRow>
                { filters.map((filter, key) =>
                  <FilterColumn
                    filter={ filter }
                    onSubmit={ this.handleSubmit }
                    onChange={ this.handleChange }
                    onDropDown={ this.handleDropDown }
                    onDeleteLabel={ this.handleDeleteLabel }
                    key={ key }
                  />)
                }
              </MDBRow>
            </MDBContainer>
          </MDBModalBody>
          
          {/* Close and submit button */ }
          <MDBModalFooter>
            <MDBBtn color="danger" onClick={ () => this.props.toggle() } size="sm">Close</MDBBtn>
            <MDBBtn color="danger" onClick={ () => this.handleReset() } size="sm">Reset</MDBBtn>
            <MDBBtn color="default" size="sm">Submit</MDBBtn>
          </MDBModalFooter>
        
        </MDBModal>
      </MDBContainer>
    );
  }
}


export default Modal;

