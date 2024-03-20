import { BaseElementRenderer } from "@/AbstractsElements/BaseElementRenderer";
import { WriteSignal, effect } from "@maverick-js/signals";

export class Text extends BaseElementRenderer {
  private localText?: string | WriteSignal<any>;

  constructor() {
    super();
    this.current = document.createElement("span");
  }

  text(text: string | WriteSignal<any>): Text {
    this.localText = text;
    return this;
  }

  render() {
    super.render();

    if (this.localText) {
      if (typeof this.localText === "function") {
        effect(() => {
          if (this.localText && typeof this.localText === "function") {
            this.current.textContent = this.localText();
          }
        });
      } else {
        this.current.textContent = this.localText;
      }
    }

    this.parent.appendChild(this.current);
  }
}

export const text = (text: string | WriteSignal<any>) => new Text().text(text);
