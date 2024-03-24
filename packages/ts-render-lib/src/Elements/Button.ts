import { BaseContainerElementRenderer } from "@/GenericElements/BaseContainerElementRenderer";
import { SignalOrValue } from "..";

export class Button extends BaseContainerElementRenderer {
  constructor() {
    super();
    this.setCurrent(document.createElement("button"));
  }

  onClick(listener: EventListener): Button {
    this.addElementListener("click", listener);
    return this;
  }
}

export const button = (text: SignalOrValue<string>): Button => {
  const button = new Button();
  button.setTextContent(text);
  return button;
};
