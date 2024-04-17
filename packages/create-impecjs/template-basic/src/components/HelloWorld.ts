import { component, text } from "impecjs";

const cpt = component();

export const HelloWorld = () => {
	cpt.addChild(text("Hello World!"));
	return cpt;
};
