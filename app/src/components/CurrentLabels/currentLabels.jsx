import React from 'react';
import {connect} from 'react-redux';
import {createLabel} from '../../features/labels/labelsSlice.js';


const CurrentLabels = (props) => {
  return (
      <div>
        <button
          onClick={() => {
            console.log('here');
            props.createLabel('Test2/subLabel');
          }}
        >click</button>
      </div>
  );
  
};


const mapStateToProps = state => {
  return {
    settings: state.settings
  };
};

const mapDispatchToProps = {
  createLabel
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLabels);
