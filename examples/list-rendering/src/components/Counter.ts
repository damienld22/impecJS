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
const computedStyle = computed<string>(
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
