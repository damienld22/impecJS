import { BaseContainerElementRenderer } from "@/GenericElements/BaseContainerElementRenderer";

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

export const button = (text: string): Button => {
  const button = new Button();
  button.setTextContent(text);
  return button;
};
