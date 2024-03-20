import { BaseContainerElementRenderer } from "@/AbstractsElements/BaseContainerElementRenderer";

export class Div extends BaseContainerElementRenderer {}

const divElement = new Div();
divElement.setCurrent(document.createElement("div"));

export const div = () => {
  const divElement = new Div();
  divElement.setCurrent(document.createElement("div"));
  return divElement;
};
