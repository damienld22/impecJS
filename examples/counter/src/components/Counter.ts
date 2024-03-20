import { component, div, text, button } from "ts-render-lib";

const style = "padding: 5px;";
const cpt = component();

const [counter, setCounter] = cpt.addState<number>(0);

export const Counter = () => {
  cpt.addChild(
    div()
      .addChild(button("-").onClick(() => setCounter(counter() - 1)))
      .addChild(text(counter).style(style))
      .addChild(button("+").onClick(() => setCounter(counter() + 1)))
  );
  return cpt;
};
