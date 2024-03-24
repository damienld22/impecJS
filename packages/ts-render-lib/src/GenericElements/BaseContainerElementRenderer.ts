import { BaseElementRenderer } from "@/GenericElements/BaseElementRenderer";
import { isHTMLElement } from "@/utils";

export class BaseContainerElementRenderer extends BaseElementRenderer {
  current: HTMLElement;
  protected children: BaseElementRenderer[] = [];
  protected onMountedCallback?: (() => void) | undefined;
  protected onDestroyedCallback?: (() => void) | undefined;

  constructor() {
    super();
    const root = document.querySelector("#app");
    if (!root) {
      throw new Error("Root element not found");
    }
    this.current = root as HTMLElement;
  }

  addChild(
    child: BaseElementRenderer | (() => BaseElementRenderer)
  ): BaseElementRenderer {
    if (typeof child === "function") {
      child = child();
    }
    child.setParent(this.current);
    this.children.push(child);
    return this;
  }

  destroy() {
    if (this.children.length > 0) {
      this.children.forEach((child) => {
        if (isHTMLElement(child.current)) {
          child.current.remove();
        }
      });

      if (this.onDestroyedCallback) {
        this.onDestroyedCallback();
      }
    }
  }

  render() {
    super.render();

    this.children.forEach((child) => {
      child.render();
    });

    if (this.parent !== this.current) {
      this.parent.appendChild(this.current);

      if (this.onMountedCallback) {
        this.onMountedCallback();
      }
    }
  }
}
