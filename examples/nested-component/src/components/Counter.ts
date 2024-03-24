import { component, div, text, button } from "ts-render-lib";
import { ResetButton } from "./ResetButton";

const cpt = component();

const [counter, setCounter] = cpt.addState<number>(0);

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
      .addChild(ResetButton({ onClick: () => setCounter(0), value: counter }))
  );
  return cpt;
};
