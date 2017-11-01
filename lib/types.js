export function stringMax140(props, propName, componentName) {
  const prop = props[propName];

  if (prop && prop.length > 140) {
    return new Error(
      `The prop \`${propName}\` length in the component \`${componentName}\` must be under 140 characters, currently is ${prop.length}.`
    );
  }
}
