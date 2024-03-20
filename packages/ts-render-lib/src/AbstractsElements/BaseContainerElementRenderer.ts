import { ElementRenderer } from "@/types/ElementRenderer";
import { BaseElementRenderer } from "@/AbstractsElements/BaseElementRenderer";

export class BaseContainerElementRenderer extends BaseElementRenderer {
  protected children: ElementRenderer[] = [];
  protected current: HTMLElement = document.querySelector("#app")!;

  constructor() {
    super();
  }

  addChild(
    child: ElementRenderer | (() => ElementRenderer)
  ): BaseElementRenderer {
    if (typeof child === "function") {
      child = child();
    }
    child.setParent(this.current);
    this.children.push(child);
    return this;
  }

  render() {
    super.render();

    this.children.forEach((child) => {
      child.render();
    });

    if (this.parent !== this.current) {
      this.parent.appendChild(this.current);
    }
  }
}
