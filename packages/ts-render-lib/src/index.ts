import { Renderer } from "@/Elements/Renderer";

export const app = new Renderer();
export const component = () => {
  const component = new Renderer();
  component.setCurrent(document.createDocumentFragment());

  return component;
};

export { text } from "@/Elements/Text";
export { div } from "@/Elements/Div";
