import { BaseElementRenderer } from "@/GenericElements/BaseElementRenderer";
import type { WriteSignal } from "@maverick-js/signals";

export class Text extends BaseElementRenderer {
	constructor() {
		super();
		this.current = document.createElement("span");
	}

	text(text: string | WriteSignal<any>): Text {
		this.currentTextContent = text;
		return this;
	}

	render() {
		super.render();
		this.parent.appendChild(this.current);
	}
}

export const text = (text: string | WriteSignal<any>) => new Text().text(text);
