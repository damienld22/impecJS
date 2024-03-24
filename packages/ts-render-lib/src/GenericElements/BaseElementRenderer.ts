import { SignalOrValue } from "@/types/Signal";
import { isHTMLElement } from "@/utils";
import { effect } from "@maverick-js/signals";

export abstract class BaseElementRenderer {
  current: Element | DocumentFragment = document.querySelector("#app")!;
  protected parent: HTMLElement = document.querySelector("#app")!;
  protected textContent?: SignalOrValue<string>;
  protected listeners: Record<string, EventListener> = {};
  protected attributes: Record<string, any> = {};
  protected conditionalRender: SignalOrValue<boolean> = true;

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

  addChild(_child: BaseElementRenderer): BaseElementRenderer {
    throw new Error("addChild is only available for container elements");
  }

  setCurrent(htmlElement: HTMLElement | DocumentFragment): void {
    this.current = htmlElement;
  }

  setTextContent(text: SignalOrValue<string>): BaseElementRenderer {
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

  if(signal: SignalOrValue<boolean>): BaseElementRenderer {
    this.conditionalRender = signal;
    return this;
  }

  render() {
    if (typeof this.conditionalRender === "function") {
      effect(() => {
        if (typeof this.conditionalRender === "function") {
          if (this.conditionalRender()) {
            this.createCurrentElement();

            // If the current element has been removed, we should re-append it
            if (!this.current.parentNode) {
              this.parent.appendChild(this.current);
            }
          } else {
            const parentNode = this.current.parentNode;
            parentNode?.removeChild(this.current);
          }
        }
      });
    } else {
      if (this.conditionalRender) {
        this.createCurrentElement();
      }
    }
  }

  private createCurrentElement() {
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
