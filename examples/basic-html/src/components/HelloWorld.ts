import { component, text } from "impecjs";

export const HelloWorld = () => {
	return component().addChild(text("Hello world from external component"));
};
