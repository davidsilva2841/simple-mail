/**
 * Build filter
 * @param index
 * @param title
 * @param name
 * @param type
 * @param multipleValues {boolean} - If multiple values allowed
 * @returns {{values : [], name : *, index : *, title : *, type : *, value : string}}
 */
function filter(index, title, name, type, multipleValues = true) {
  return {
    index,
    title,
    name,
    type,
    multipleValues,
    values: [],
    value: '',
  };
}


module.exports = [
  filter(0, 'Sent To', 'to', 'address'),
  filter(1, 'From', 'from', 'address'),
  filter(2, 'Add Label', 'addLabelIds', 'addLabel', false),
  filter(3, 'Remove Labels', 'removeLabelIds', 'removeLabel'),
];

