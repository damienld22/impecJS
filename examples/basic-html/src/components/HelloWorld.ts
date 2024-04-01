import { component, text } from "impec-js";

export const HelloWorld = () => {
	return component().addChild(text("Hello world from external component"));
};
