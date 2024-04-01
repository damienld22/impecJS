import { component, text } from "impec-js-lib";

const cpt = component();

export const HelloWorld = () => {
	cpt.addChild(text("Hello World (will be destroyed after 1s)"));

	cpt.onMounted(() => {
		console.log("Component is mounted");
	});

	cpt.onDestroyed(() => {
		console.log("Component is destroyed");
	});

	setTimeout(() => {
		cpt.destroy();
	}, 1000);

	return cpt;
};
