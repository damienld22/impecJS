import { component, div, text, button, state, computed } from "impec-js-lib";
import "./Counter.css";

const cpt = component();

const [counter, setCounter] = state<number>(0);
const computedStyle = computed<string>(
	() => `padding: 5px; color: ${counter() > 0 ? "green" : "red"};`,
);

const computedClass = computed<string>(() =>
	counter() > 0 ? "text-bold" : "text-italic",
);

export const Counter = () => {
	cpt.addChild(
		div()
			.addChild(
				button("-")
					.onClick(() => setCounter(counter() - 1))
					.attribute("data-testid", "decrement-button"),
			)
			.addChild(text(counter).class(computedClass).style(computedStyle))
			.addChild(
				button("+")
					.onClick(() => setCounter(counter() + 1))
					.attribute("data-testid", "increment-button"),
			),
	);
	return cpt;
};
