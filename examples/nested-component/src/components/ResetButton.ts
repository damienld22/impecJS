import { button, component, Signal } from "ts-render-lib";

interface Props {
  onClick: () => void;
  value: Signal<number>;
}

export const ResetButton = (props: Props) => {
  const cpt = component(props);
  const textButton = cpt.addComputed(() => `Reset (${props.value()})`);

  cpt.addChild(button(textButton).onClick(props.onClick));

  return cpt;
};
