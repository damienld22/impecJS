import { button, component, Signal, computed } from "ts-render-lib";

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
