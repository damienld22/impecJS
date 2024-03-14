import { ElementRenderer } from "@/types/ElementRenderer";
import { BaseElementRenderer } from "@/AbstractsElements/BaseElementRenderer";

export class BaseContainerElementRenderer extends BaseElementRenderer {
  protected children: ElementRenderer[] = [];
  protected current: HTMLElement;

  constructor() {
    super();
    this.current = document.createElement("div");
  }

  addChild(child: ElementRenderer): ElementRenderer {
    child.setParent(this.current);
    this.children.push(child);
    return this;
  }

  render() {
    super.render();

    this.children.forEach((child) => {
      child.render();
    });

    this.parent.appendChild(this.current);
  }
}
