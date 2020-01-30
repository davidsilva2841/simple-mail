import { MDBSelect } from "mdbreact";



let options1 =  [
  {
    text: "USA",
    value: "1"
  },
  {
    text: "Germany",
    value: "2"
  },
  {
    text: "France",
    value: "3"
  },
  {
    text: "Poland",
    value: "4"
  },
  {
    text: "Japan",
    value: "5"
  }
];

const getOptions = (labels, selectedIds) => {
  let options = [];
  for(let label of labels) {
    if (!selectedIds.includes(label.id)){
      options.push({
        text: label.name,
        value: label.id
      })
    }

  }
  return options;
};



import React, { Component } from 'react';
import {connect} from "react-redux";
class LabelInputDropDown extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedIds: []
    };
    this.handleSelectValue = this.handleSelectValue.bind(this);
  }
  
  handleSelectValue (value) {
    let {selectedIds} = this.state;
    selectedIds.push(value);
    this.setState({selectedIds});
  }
  
  componentDidMount () {
    console.log(`FILE: labelInputDropDown.jsx componentDidMount() | this.props.email: \n`, this.props.email);
  }
  
  render () {
    const {index, value, onSubmit, onChange} = this.props;
    const {selectedIds} = this.state;
    // let options = getOptions(email.labels, selectedIds);
    
    return (
      <div id={index}>
        <MDBSelect
          search
          id={`LabelInputDropDown-${index}`}
          options={options1}
          selected=""
          // getTextContent={() => this.reloadMe()}
          // getValue={(e) => test(e)}
          label=""
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {email: state.email}
};


export default connect(mapStateToProps, {})(LabelInputDropDown);
