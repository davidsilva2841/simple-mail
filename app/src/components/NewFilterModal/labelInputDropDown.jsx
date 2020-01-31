import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const getOptions = (labels) => {
  let options = [];
  for (let i = 0 ; i < labels.length ; i++) {
    options.push({
      value: i.toString(),
      text: labels[i].name,
      id: labels[i].id
    })
  }

  return options;
};


const LabelInputDropDown = (props) => {
  const email = useSelector(state => state.email);
  const {index, onDropDown} = props;
  const options = getOptions(email.labels);
  return (
    <div >
      <MDBSelect
        search
        // id={`LabelInputDropDown-${index}`}
        options={options}
        selected=""
        // getTextContent={() => this.reloadMe()}
        getValue={(value) => onDropDown(options[value], index)}
        label=""
      />
    </div>
  );

};

export default LabelInputDropDown;

