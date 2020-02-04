import FilterEditButton from "./filterEditButton";
import FilterDeleteButton from "./filterDeleteButton";

import ConditionLabel from "./conditionLabel";

import React from "react";

const getRow = filter => {
  let row = {};
  row.editFilter = <FilterEditButton filter={filter}/>;
  row.deleteFilter = <FilterDeleteButton filterId={filter.id}/>;
  
  row.sentToAddress = filter.sentToAddress.map((sentTo, key) =>
    <ConditionLabel
      type='sentToAddress'
      filterId={filter.id}
      display={sentTo}
      key={key}
    />
  );
  
  row.fromAddress = filter.fromAddress.map((fromAddress, key) =>
    <ConditionLabel
      type='fromAddress'
      filterId={filter.id}
      display={fromAddress}
      key={key}
    />
  );
  
  row.addLabel = filter.addLabels.map((addLabel, key) =>
    <ConditionLabel
      type='addLabel'
      filterId={filter.id}
      display={addLabel.name}
      key={key}
    />
  );
  
  row.removeLabels = filter.removeLabels.map((removeLabel, key) =>
    <ConditionLabel
      type='removeLabel'
      filterId={filter.id}
      display={removeLabel.name}
      key={key}
    />
  );
  return row;
};


const getRows = filters => {
  let rows = [];
  for(let filter of filters) {
    rows.push(getRow(filter));
  }
  return rows;
};


export default getRows;
