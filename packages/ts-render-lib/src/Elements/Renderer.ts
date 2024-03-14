import { BaseContainerElementRenderer } from "@/AbstractsElements/BaseContainerElementRenderer";

export class Renderer extends BaseContainerElementRenderer {
  constructor() {
    super();
    this.current = document.querySelector("#app")!;
  }
}
