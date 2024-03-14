import { BaseElementRenderer } from "@/AbstractsElements/BaseElementRenderer";

export class Text extends BaseElementRenderer {
  private localText?: string;

  constructor() {
    super();
    this.current = document.createElement("span");
  }

  text(text: string): Text {
    this.localText = text;
    return this;
  }

  render() {
    super.render();

    if (this.localText) {
      this.current.textContent = this.localText;
    }

    this.parent.appendChild(this.current);
  }
}

export const text = (text: string) => new Text().text(text);
