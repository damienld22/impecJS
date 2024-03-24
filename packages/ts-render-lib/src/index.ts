import { Renderer } from "@/Elements/Renderer";
import { Component } from "./Elements/Component";
import { BaseContainerElementRenderer } from "./GenericElements/BaseContainerElementRenderer";

export const app = () => new Renderer();
export const component = (props?: unknown) => {
  const component = new Component<typeof props>(props);
  component.setCurrent(document.createDocumentFragment());

  return component;
};

export { text } from "@/Elements/Text";
export { div } from "@/Elements/Div";
export { button } from "@/Elements/Button";

export const element = (tagName: keyof HTMLElementTagNameMap) => {
  const element = new BaseContainerElementRenderer();
  element.setCurrent(document.createElement(tagName));
  return element;
};

// Export signal types
export * from "@/types/Signal";
