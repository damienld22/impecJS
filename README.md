# ts-render

## Description

A small frontend library to generate frontend application (SPA) using Builder design pattern.

### Why

Because this is funny.

The second purpose of this library is to improve my knowledge of TypeScript and Frontend library concepts.

## To do

- [ ] More real examples
- [ ] Real packaging
- [ ] Benchmark
- [ ] More TU (on real life cases)
- [ ] Documentation for contributing
- [ ] Dependencies tree of Renderer
- [ ] CI to deploy lib (with linter / TU / etc...)
- [ ] See later ...

## Documentation

### Getting started

Using _ts-render_ is pretty simple. It is inspired on [Builder design pattern](https://refactoring.guru/design-patterns/builder) to chain the creation of DOM elements or add attributes an them.

The library provide some functions to create DOM element and always return the created instance to chain them.

See the _HelloWorld_ code :

```js
import { app } from "ts-render-lib";

app().addChild(text("Hello World")).render();
```

`app()` Create the root of your application.

Then you use `addChild()` to add element. For example here, we add a text (`span`).

#### State in _ts-render_

The state management is based on `Signal` (Using the library [maverick-js/signals](https://github.com/maverick-js/signals)).

To create a state, you use `state` function.
This function return a tuple of [value, setter] like ReactJS.

```js
import { state } from "ts-render";

const [value, setValue] = state<number>(0);
```

To create value automatically updated when its dependencies are updated, you can use `computed` :

```js
import { state, computed } from "ts-render";

const [value, setValue] = state<number>(0);
const isPositive = computed(() => value() > 0)
```

If you want execute code when a state is updated, you can use `effect` :

```js
import { state, effect } from "ts-render";

const [value, setValue] = state<number>(0);
effect(() => console.log(`value is updated : ${value()}`))
```

#### Create DOM element

_ts-render_ provide a function to create DOM element : `element`.
You can easily add any attribute of them using `attribute` function or add event listener using `addEventListener`.

The properties `value` and `textContent` are specifics so dedicated functions exists : `value` and `textContent`.

See this example : 

```js
import { app, element } from 'ts-render';

app()
  // Add a basic button
  .addChild(
    element('button')
      .attribute('name', 'my-button')
      .addEventListener('click', () => console.log('Clicked !'))
      .textContent('Click me')
  )

  // Add a basic input value
  .addChild(
    element('input')
      .value('Input value')
  )
  // Render the DOM
  .render();
```

As you can see, `addChild` is used to put new element as child node of another.

Fortunately, _ts-render_ provide some function to facilitate the creation of DOM elements or attributes.

For example you have :
- `style()` to apply style
- `class()` to add classes
- `text()` to create a basic span
- `div()` to create a div
- `button()` to create a button
- See more... 


#### Case of _app_

Each app start with `app()`. You can only add children on it (with `addChild`).

To create your application you need to use `render()` function at the end of your "build chain".

#### Attributes with signals

Each attribute / textContent / value / etc... can use primitive value but also signal to be automatically updated.

```js
import { component, div, text, button, state, computed } from "ts-render-lib";

const [counter, setCounter] = state<number>(0);
const plainValue = 12;

app()
  .addChild(text(counter))
  .addChild(text(plainValue))
  .render();
```

### Use cases

#### Create component

To split your application, you ca use `component()` to create new component like any component based frontend library.

Then you juste need to call the exported component like a function to use it.

```js
// HelloWorld.ts
import { component, text } from "ts-render-lib";

export const HelloWorld = () => {
  return component().addChild(text("Hello World from component"));
};
```

```js
// index.ts
import { app } from "ts-render-lib";
import { HelloWorld } from "./HelloWorld";

app().addChild(HelloWorld()).render();
```

#### Props on component

You can pass `props` using the parameters of the component function.
You can put function to emit value to the parent component.

```js
// HelloWorld.ts
import { component, text } from "ts-render-lib";

export const HelloWorld = ({ value: string }) => {
  return component().addChild(text(value));
};
```

```js
// index.ts
import { app } from "ts-render-lib";
import { HelloWorld } from "./HelloWorld";

app()
  .addChild(HelloWorld({ value: "Hello World prop" }))
  .render();
```

#### Component lifecycle hooks

There is only 2 lifecycle hooks at this time :

- onMounted : When the component is rendered
- onDestroyed : When the component is removed to the DOM

```js
// HelloWorld.ts
import { component, text } from "ts-render-lib";

const cpt = component();

export const HelloWorld = () => {
  cpt.addChild(text("Hello World (will be destroyed after 1s)"));

  cpt.onMounted(() => {
    console.log("Component is mounted");
  });

  cpt.onDestroyed(() => {
    console.log("Component is destroyed");
  });

  return cpt;
};
```

#### State (Signal)

```js
// Counter.ts
import { component, div, text, button, state, computed } from "ts-render-lib";

const cpt = component();

const [counter, setCounter] = state < number > 0;

export const Counter = () => {
  cpt.addChild(
    div()
      .addChild(button("-").onClick(() => setCounter(counter() - 1)))
      .addChild(text(counter))
      .addChild(button("+").onClick(() => setCounter(counter() + 1)))
  );
  return cpt;
};
```

#### Computed values

```js
// Counter.ts
import { component, div, text, button, state, computed } from "ts-render-lib";

const cpt = component();

const [counter, setCounter] = state < number > 0;

// The class depend on counter value
const computedClass =
  computed < string > (() => (counter() > 0 ? "text-bold" : "text-italic"));

export const Counter = () => {
  cpt.addChild(
    div()
      .addChild(button("-").onClick(() => setCounter(counter() - 1)))
      .addChild(text(counter).class(computedClass))
      .addChild(button("+").onClick(() => setCounter(counter() + 1)))
  );
  return cpt;
};
```

#### Effects

```js
// Counter.ts
import { component, div, text, button, state, effect } from "ts-render-lib";

const cpt = component();

const [counter, setCounter] = state < number > 0;

effect(() => console.log("Counter value changed", counter()));

export const Counter = () => {
  cpt.addChild(
    div()
      .addChild(button("-").onClick(() => setCounter(counter() - 1)))
      .addChild(text(counter))
      .addChild(button("+").onClick(() => setCounter(counter() + 1)))
  );
  return cpt;
};
```

#### Conditional rendering

On each element, you can use `if()` method to put conditional rendering.

```js
// Counter.ts
import { component, div, text, button, state, computed } from "ts-render-lib";

const cpt = component();

const [counter, setCounter] = state < number > 0;
const isCounterSup0 = computed(() => counter() > 0);

// The class depend on counter value
const computedClass =
  computed < string > (() => (counter() > 0 ? "text-bold" : "text-italic"));

export const Counter = () => {
  cpt.addChild(
    div()
      .addChild(button("-").onClick(() => setCounter(counter() - 1)))
      .addChild(text(counter).class(computedClass))
      .addChild(button("+").onClick(() => setCounter(counter() + 1)))
      .addChild(text("Counter > 0").if(isCounterSup0))
  );
  return cpt;
};
```

#### List rendering

To create a loop, you can use `loop()` method. In first argument, you use the elements to render, in second argument, you put a callback to render each element of the list.

```js
// Counter.ts
import {
  component,
  div,
  text,
  button,
  loop,
  state,
  computed,
} from "ts-render-lib";

const cpt = component();

const [counter, setCounter] = state < number > 0;
const isDisabled = computed < boolean > (() => counter() === 0);
const lines = computed(() => new Array(counter()).fill("Line"));

export const Counter = () => {
  cpt
    .addChild(
      div()
        .addChild(text("Number of lines : "))
        .addChild(
          button("-")
            .onClick(() => setCounter(counter() - 1))
            .attribute("disabled", isDisabled)
        )
        .addChild(text(counter))
        .addChild(button("+").onClick(() => setCounter(counter() + 1)))
    )
    .addChild(loop(lines, (elt: string) => div().addChild(text(elt))));
  return cpt;
};
```

#### Slot

There is no `Slot`-like feature in "ts-render" because you can easily use `addChild()`.
