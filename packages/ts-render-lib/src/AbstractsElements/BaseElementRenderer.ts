import { ElementRenderer } from "@/types/ElementRenderer";
import { SignalOrValue } from "@/types/Signal";
import { isHTMLElement } from "@/utils";
import { effect } from "@maverick-js/signals";

export abstract class BaseElementRenderer implements ElementRenderer {
  protected parent: HTMLElement = document.querySelector("#app")!;
  protected current: Element | DocumentFragment =
    document.querySelector("#app")!;
  protected textContent?: SignalOrValue<string>;
  protected listeners: Record<string, EventListener> = {};
  protected attributes: Record<string, any> = {};

  setParent(parent: HTMLElement) {
    this.parent = parent;
  }

  attribute(name: string, value: SignalOrValue<string>): BaseElementRenderer {
    this.attributes[name] = value;
    return this;
  }

  style(style: SignalOrValue<string>): BaseElementRenderer {
    this.attributes["style"] = style;
    return this;
  }

  class(className: SignalOrValue<string>): BaseElementRenderer {
    this.attributes["class"] = className;
    return this;
  }

  addChild(_child: ElementRenderer): BaseElementRenderer {
    throw new Error("addChild is only available for container elements");
  }

  setCurrent(htmlElement: HTMLElement | DocumentFragment): void {
    this.current = htmlElement;
  }

  setTextContent(text: string): BaseElementRenderer {
    this.textContent = text;
    return this;
  }

  addElementListener(
    name: string,
    listener: EventListener
  ): BaseElementRenderer {
    this.listeners[name] = listener;
    return this;
  }

  render() {
    // Apply text content
    if (this.textContent) {
      if (typeof this.textContent === "function") {
        effect(() => {
          if (this.textContent && typeof this.textContent === "function") {
            this.current.textContent = this.textContent();
          }
        });
      } else {
        this.current.textContent = this.textContent;
      }
    }

    // Apply attributes
    for (const [name, value] of Object.entries(this.attributes)) {
      if (typeof value === "function") {
        effect(() => {
          if (typeof value === "function" && isHTMLElement(this.current)) {
            this.current.setAttribute(name, value() as string);
          }
        });
      } else {
        if (isHTMLElement(this.current)) {
          this.current.setAttribute(name, value);
        }
      }
    }

    // Apply listeners
    for (const [name, listener] of Object.entries(this.listeners)) {
      this.current.addEventListener(name, listener);
    }
  }
}
