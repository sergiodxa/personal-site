export default (...functions) => initialData =>
  functions.reduce((data, fn) => fn(data), initialData);
