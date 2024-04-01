import { component, div, text, button, state, effect } from "impec-js";
import { ResetButton } from "./ResetButton";

const cpt = component();

const [counter, setCounter] = state<number>(0);

effect(() => {
	console.log("Counter has changed to", counter());
});

export const Counter = () => {
	cpt.addChild(
		div()
			.addChild(
				button("-")
					.onClick(() => setCounter(counter() - 1))
					.attribute("data-testid", "decrement-button"),
			)
			.addChild(text(counter).style("padding: 5px;"))
			.addChild(
				button("+")
					.onClick(() => setCounter(counter() + 1))
					.attribute("data-testid", "increment-button"),
			)
			.addChild(ResetButton({ onClick: () => setCounter(0), value: counter })),
	);
	return cpt;
};
