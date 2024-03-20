import { ElementRenderer } from "@/types/ElementRenderer";
import { isHTMLElement } from "@/utils";

export abstract class BaseElementRenderer implements ElementRenderer {
  protected parent: HTMLElement = document.querySelector("#app")!;
  protected current: Element | DocumentFragment =
    document.querySelector("#app")!;
  protected eltStyle: string = "";
  protected eltClass: string = "";
  protected textContent?: string;
  protected listeners: Record<string, EventListener> = {};

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

  setCurrent(htmlElement: HTMLElement | DocumentFragment): void {
    this.current = htmlElement;
  }

  setTextContent(text: string): ElementRenderer {
    this.textContent = text;
    return this;
  }

  addElementListener(name: string, listener: EventListener): ElementRenderer {
    this.listeners[name] = listener;
    return this;
  }

  render() {
    // Apply style
    if (isHTMLElement(this.current)) {
      if (this.eltStyle) {
        this.current.setAttribute("style", this.eltStyle);
      }

      // Apply classes
      if (this.eltClass) {
        this.current.setAttribute("class", this.eltClass);
      }

      if (this.textContent) {
        this.current.textContent = this.textContent;
      }
    }

    // Apply listeners
    for (const [name, listener] of Object.entries(this.listeners)) {
      this.current.addEventListener(name, listener);
    }
  }
}
