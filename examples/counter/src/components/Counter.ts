import { component, div, text, button } from "ts-render-lib";
import "./Counter.css";

const cpt = component();

const [counter, setCounter] = cpt.addState<number>(0);
const computedStyle = cpt.addComputed<string>(
  () => `padding: 5px; color: ${counter() > 0 ? "green" : "red"};`
);

const computedClass = cpt.addComputed<string>(() =>
  counter() > 0 ? "text-bold" : "text-italic"
);

export const Counter = () => {
  cpt.addChild(
    div()
      .addChild(
        button("-")
          .onClick(() => setCounter(counter() - 1))
          .attribute("data-testid", "decrement-button")
      )
      .addChild(text(counter).class(computedClass).style(computedStyle))
      .addChild(
        button("+")
          .onClick(() => setCounter(counter() + 1))
          .attribute("data-testid", "increment-button")
      )
  );
  return cpt;
};
