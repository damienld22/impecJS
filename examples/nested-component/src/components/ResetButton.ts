import { button, component, type Signal, computed } from "impecjs";

interface Props {
	onClick: () => void;
	value: Signal<number>;
}

export const ResetButton = (props: Props) => {
	const cpt = component(props);
	const textButton = computed(() => `Reset (${props.value()})`);

	cpt.addChild(button(textButton).onClick(props.onClick));

	return cpt;
};
