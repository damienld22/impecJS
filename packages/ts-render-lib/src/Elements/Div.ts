import { BaseContainerElementRenderer } from "@/GenericElements/BaseContainerElementRenderer";

export class Div extends BaseContainerElementRenderer {}

export const div = () => {
  const divElement = new Div();
  divElement.setCurrent(document.createElement("div"));
  return divElement;
};
