import compose from 'recompose/compose';

import Essay from '../../../layouts/essay.js';

import withError from '../../../lib/with-error.js';
import withGA from '../../../lib/with-ga.js';
import withSW from '../../../lib/with-sw.js';

export default compose(withError, withGA, withSW)(() => (
  <Essay
    title="Learning React: What is React.js?"
    date="2017-10-17T00:00:00Z"
    description="So, you have decided to learning React, that’s great, but what is React actually?"
    content={`
# Learning React: What is React.js?
So, you have decided to learn React, that’s great, but what is React actually?

You may have heard that React is a library, and yes, that’s true, React is a JavaScript library created by Facebook and published as Open Source in 2013 that allow you to easily create user interfaces for Web, Mobile, CLI, Desktop, etc. using reusable components.

It become one of the most popular JS libraries because of the features it implements.

### Declarative
Instead of coding exactly how our UI will be created we let React take care of that and we only need define **what we want**.

React also update and render our UI (the DOM) when a change occur, so again if we want to change the UI we just need to define the new state and React take care instead of manually updating it.

### Component based
In React we create components, what’s a component? An isolated piece of UI we can reuse and combine to create more complex interfaces.

Each component can have their own internal state, that means if we have a modal component it know internally if it’s open or closed, if we use the same component in two places at the same time each one will have his own internal state so one could be open and the other close.

That allow the easily reutilization of components.

### Learn Once, Write Anywhere
React is mainly focused on web but it can be used anywhere and for any kind of application, you can use it [server side](https://github.com/zeit/next.js/), [draw to SVG](https://github.com/atomic-app/react-svg) or [canvas](), create [3D](https://github.com/Izzimach/react-three) an [VR experiences](https://facebook.github.io/react-vr/) with WebGL, [build native mobile UI](https://facebook.github.io/react-native/), [code CLI programs](https://github.com/Yomguithereal/react-blessed), [code hardware](http://iamdustan.com/react-hardware/) [and more](https://github.com/chentsulin/awesome-react-renderer).

But that doesn’t mean you can reuse your code, instead if you learn React you can use your knowledge to create any kind of applications without learning from zero again.

## Conclusion
React defined a new way to create web application, the React community it’s huge and it’s sharing a lot of knowledge on how to build big applications with React. Before the React popularity boom

In a next article we are going to create our first ever React component.
    `}
  />
));
