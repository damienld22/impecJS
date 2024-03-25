import { component, div, text, button, loop } from "ts-render-lib";

const cpt = component();

const [counter, setCounter] = cpt.addState<number>(0);

const isDisabled = cpt.addComputed<boolean>(() => counter() === 0);

const lines = cpt.addComputed(() => new Array(counter()).fill("Line"));
const computedStyle = cpt.addComputed<string>(
  () => `padding: 5px; color: ${counter() >= 5 ? "red" : "black"};`
);

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
        .addChild(text(counter).style("padding: 5px"))
        .addChild(button("+").onClick(() => setCounter(counter() + 1)))
    )
    .addChild(
      loop(lines, (elt: string) =>
        div().style(computedStyle).addChild(text(elt))
      )
    );
  return cpt;
};
