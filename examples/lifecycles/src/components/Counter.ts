import { component, div, text, button } from "ts-render-lib";

const cpt = component();

const [counter, setCounter] = cpt.addState<number>(0);
const isPositiveOr0 = cpt.addComputed(() => counter() >= 0);
const isNegative = cpt.addComputed(() => counter() < 0);

export const Counter = () => {
  cpt.addChild(
    div()
      .addChild(
        button("-")
          .onClick(() => setCounter(counter() - 1))
          .attribute("data-testid", "decrement-button")
      )
      .addChild(text(counter).style("padding: 5px;"))
      .addChild(
        button("+")
          .onClick(() => setCounter(counter() + 1))
          .attribute("data-testid", "increment-button")
      )
      .addChild(
        text("The number is positive or 0")
          .style("margin: 5px; color: green;")
          .if(isPositiveOr0)
      )
      .addChild(
        text("The number is negative")
          .style("margin: 5px; color: red;")
          .if(isNegative)
      )
  );
  return cpt;
};
