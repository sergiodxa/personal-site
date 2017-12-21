function stringMax(limit) {
  return (props, propName, componentName) => {
    const prop = props[propName];

    if (typeof prop !== 'string') {
      return new Error(
        `The prop \`${propName}\` in the component \`${componentName}\` must be an string, currently is ${typeof prop}.`
      );
    }

    if (prop && prop.length > limit) {
      return new Error(
        `The prop \`${propName}\` length in the component \`${componentName}\` must be under ${limit} characters, currently is ${
          prop.length
        }.`
      );
    }
  };
}

export const stringMax140 = stringMax(140);

export const stringMax280 = stringMax(280);
