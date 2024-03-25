import { BaseContainerElementRenderer } from "@/GenericElements/BaseContainerElementRenderer";
import { BaseElementRenderer } from "@/GenericElements/BaseElementRenderer";
import { SignalOrValue } from "@/types/Signal";
import { effect } from "@maverick-js/signals";

export class Loop extends BaseContainerElementRenderer {
  elements: SignalOrValue<any[]>;
  renderCallback: (elt: any) => BaseElementRenderer;

  constructor(
    elements: SignalOrValue<any[]>,
    render: (elt: any) => BaseElementRenderer
  ) {
    super();
    this.setCurrent(document.createElement("div"));
    this.elements = elements;
    this.renderCallback = render;

    effect(() => {
      if (typeof this.elements === "function") {
        // Clean existing children
        this.children.forEach((child) => {
          this.current.removeChild(child.current);
        });
        this.children = [];

        // Create all new children
        this.elements().forEach((elt) => {
          this.addChild(() => this.renderCallback(elt));
        });

        // Render new children
        this.children.forEach((child) => {
          child.render();
        });
      } else {
        this.elements.map((elt) =>
          this.addChild(() => this.renderCallback(elt))
        );
      }
    });
  }

  render() {
    super.render();
  }
}

export const loop = (
  elements: SignalOrValue<any[]>,
  render: (elt: any) => BaseElementRenderer
): Loop => {
  const loop = new Loop(elements, render);
  return loop;
};
