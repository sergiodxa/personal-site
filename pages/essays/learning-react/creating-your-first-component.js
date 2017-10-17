import compose from 'recompose/compose';

import Essay from '../../../layouts/essay.js';

import withError from '../../../lib/with-error.js';
import withGA from '../../../lib/with-ga.js';
import withSW from '../../../lib/with-sw.js';

export default compose(withError, withGA, withSW)(() => (
  <Essay
    title="Learning React: Creating your first component"
    date="2017-10-17T00:00:00Z"
    description="You know what is React, but you still don’t know how to use it, this time we are going to create our first React component."
    content={`
# Learning React: Creating your first component
You know [what is React](/essays/learning-react/what-is-react), but you still don’t know how to use it, this time we are going to create our first React component.

How you create a React component? Just create a function who return HTML (JSX).

~~~js
function HelloWorld() {
  return <h1>Hello, world!</h1>
}
~~~

That’s all, that’s our first React component, but we want to see that in our browser right? In order to do that we are going to require 2 libraries. [React](https://reactjs.org/docs/react-api.html) and [ReactDOM](https://reactjs.org/docs/react-dom.html).

The first is React (duh) and the second have all the logic to render React components to DOM. I suppose here you are thinking why have two different libraries? That’s because React not only render to DOM. Remember we can create native mobile apps and that’s thanks to [React Native](https://native.reactjs.org) and even [other render targets](https://github.com/chentsulin/awesome-react-renderer).

So we need to load that, we are going to use CodeSandbox, when we create a new sandbox we have them automatically added as dependencies so we just need to import them

~~~js
import React from 'react';
import ReactDOM from 'react-dom';
~~~

Then we need to create an empty HTML tag (a div in our example) where we are going to render our React application.

~~~html
<div id="root"></div>
~~~

Then we can render our <HelloWorld /> component to that element.

~~~
ReactDOM.render(<HelloWorld />, document.getElementById('root'));
~~~

That \`render\` method of **ReactDOM** receive 2 arguments, the first is our React component, the second one it’s the DOM element where we are going to render that component.

> Check we use our component as if it was a HTML tag \`<HelloWorld />\` as if it was a \`<img />\` tag. That's JSX.

If we have all of that in our CodeSandbox we should see something like this.

@[codesandbox](rl582w01qm)

And that way you created your first React component and render it. Check that right now our component only render a static \`<h1 />\` and don’t do anything useful.

That’s only our first component and we are learning React from the ground, we don’t need to start with a lot of things. Try creating more component and use more HTML. Just remember a simple rule, your component can only return a single HTML tag, but that tag can have any amount of children tags.

In a next article we are going to see how to compose multiple React components.
    `}
  />
));
