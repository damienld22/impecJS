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
- [ ] Documentation to construct elements, add attribute, event listener, signal usage
- [ ] Documentation for contributing
- [ ] Dependencies tree of Renderer
- [ ] CI to deploy lib
- [ ] See later ...

## Documentation

### HelloWorld case

`app()` Create the root of your application.

Then you use `addChild()` to add element. For example here, we add a text (`span`).

```js
import { app } from "ts-render-lib";

app().addChild(text("Hello World")).render();
```

### Create component

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

### Props on component

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

### Component lifecycle hooks

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

### State (Signal)

The state management is based on `Signal` (Using the library [maverick-js/signals](https://github.com/maverick-js/signals)).

To create a state, you use `state` function.
This function return a tuple of [value, setter] like ReactJS.

```js
// Counter.ts
import { component, div, text, button, state, computed } from "ts-render-lib";

const cpt = component();

const [counter, setCounter] = state<number>(0);

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

### Computed values

To create state updated when a dependency is update, you can use `computed`.

```js
// Counter.ts
import { component, div, text, button, state, computed } from "ts-render-lib";

const cpt = component();

const [counter, setCounter] = state<number>(0);

// The class depend on counter value
const computedClass = computed<string>(() =>
  counter() > 0 ? "text-bold" : "text-italic"
);

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

### Effects

To launch code when a dependency signal is updated, you can use `effect`.

```js
// Counter.ts
import { component, div, text, button, state, effect } from "ts-render-lib";

const cpt = component();

const [counter, setCounter] = state<number>(0);

effect(() => console.log('Counter value changed', counter()));

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

### Conditional rendering

On each element, you can use `if()` method to put conditional rendering.

```js
// Counter.ts
import { component, div, text, button, state, computed } from "ts-render-lib";

const cpt = component();

const [counter, setCounter] = state<number>(0);
const isCounterSup0 = computed(() => counter() > 0);

// The class depend on counter value
const computedClass = computed<string>(() =>
  counter() > 0 ? "text-bold" : "text-italic"
);

export const Counter = () => {
  cpt.addChild(
    div()
      .addChild(button("-").onClick(() => setCounter(counter() - 1)))
      .addChild(text(counter).class(computedClass))
      .addChild(button("+").onClick(() => setCounter(counter() + 1)))
      .addChild(text('Counter > 0').if(isCounterSup0))
  );
  return cpt;
};
```

### List rendering

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

const [counter, setCounter] = state<number>(0);
const isDisabled = computed<boolean>(() => counter() === 0);
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
    .addChild(
      loop(lines, (elt: string) =>
        div().addChild(text(elt))
      )
    );
  return cpt;
};
```

### Slot

There is no `Slot`-like feature in "ts-render" because you can easily use `addChild()`.
