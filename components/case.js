function Case({ value, ...cases }) {
  const component =
    cases[`on${value.slice(0, 1).toUpperCase()}${value.slice(1)}`];
  if (!component) return null;
  return component;
}

export default Case;
