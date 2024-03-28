import { SignalOrValue } from "@/types/Signal";
import { isHTMLElement } from "@/utils";
import { effect } from "@maverick-js/signals";

export abstract class BaseElementRenderer {
  current: Element | DocumentFragment = document.querySelector("#app")!;
  protected parent: HTMLElement = document.querySelector("#app")!;
  protected currentTextContent?: SignalOrValue<string>;
  protected listeners: Record<string, EventListener> = {};
  protected attributes: Record<string, any> = {};
  protected conditionalRender: SignalOrValue<boolean> = true;
  protected currentValue: SignalOrValue<any>;

  setParent(parent: HTMLElement) {
    this.parent = parent;
  }

  attribute(name: string, value: SignalOrValue<any>): BaseElementRenderer {
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

  value(val: SignalOrValue<any>): BaseElementRenderer {
    this.currentValue = val;
    return this;
  }

  addChild(_child: BaseElementRenderer): BaseElementRenderer {
    throw new Error("addChild is only available for container elements");
  }

  setCurrent(htmlElement: HTMLElement | DocumentFragment): void {
    this.current = htmlElement;
  }

  textContent(text: SignalOrValue<string>): BaseElementRenderer {
    this.currentTextContent = text;
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
    // Apply value
    if (this.currentValue) {
      if (typeof this.currentValue === "function") {
        effect(() => {
          if (this.currentValue && typeof this.currentValue === "function") {
            (this.current as HTMLInputElement).value = this.currentValue();
          }
        });
      } else {
        this.current.nodeValue = this.currentTextContent as any;
      }
    }

    // Apply text content
    if (this.currentTextContent) {
      if (typeof this.currentTextContent === "function") {
        effect(() => {
          if (this.currentTextContent && typeof this.currentTextContent === "function") {
            this.current.textContent = this.currentTextContent();
          }
        });
      } else {
        this.current.textContent = this.currentTextContent;
      }
    }

    // Apply attributes
    for (const [name, value] of Object.entries(this.attributes)) {
      if (typeof value === "function") {
        effect(() => {
          if (typeof value === "function" && isHTMLElement(this.current)) {
            if (typeof value() === "boolean") {
              if (value()) {
                this.current.setAttribute(name, "true");
              } else {
                if (this.current.hasAttribute(name)) {
                  this.current.removeAttribute(name);
                }
              }
            } else {
              this.current.setAttribute(name, value());
            }
          }
        });
      } else {
        if (isHTMLElement(this.current)) {
          if (typeof value === "boolean") {
            if (value) {
              this.current.setAttribute(name, "true");
            } else {
              if (this.current.hasAttribute(name)) {
                this.current.removeAttribute(name);
              }
            }
          } else {
            this.current.setAttribute(name, value);
          }
        }
      }
    }

    // Apply listeners
    for (const [name, listener] of Object.entries(this.listeners)) {
      this.current.addEventListener(name, listener);
    }
  }
}
