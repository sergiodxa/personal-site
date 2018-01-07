function Case({ value, ...cases }) {
  const caseName = `on${value.slice(0, 1).toUpperCase()}${value
    .slice(1)
    .toLowerCase()}`;
  const component = cases[caseName];
  if (!component) return null;
  return component;
}

export default Case;
