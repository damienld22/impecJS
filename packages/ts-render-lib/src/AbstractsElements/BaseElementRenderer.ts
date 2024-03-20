import { ElementRenderer } from "@/types/ElementRenderer";

export abstract class BaseElementRenderer implements ElementRenderer {
  protected parent: HTMLElement = document.querySelector("#app")!;
  protected current: HTMLElement = document.querySelector("#app")!;
  protected eltStyle: string = "";
  protected eltClass: string = "";

  setParent(parent: HTMLElement) {
    this.parent = parent;
  }

  style(style: string): ElementRenderer {
    this.eltStyle = style;
    return this;
  }

  class(className: string): ElementRenderer {
    this.eltClass = className;
    return this;
  }

  addChild(_child: ElementRenderer): ElementRenderer {
    throw new Error("addChild is only available for container elements");
  }

  render() {
    // Apply style
    if (this.eltStyle) {
      this.current.setAttribute("style", this.eltStyle);
    }

    // Apply classes
    if (this.eltClass) {
      this.current.setAttribute("class", this.eltClass);
    }
  }
}
