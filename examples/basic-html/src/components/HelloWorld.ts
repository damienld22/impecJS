import { component, text } from "ts-render-lib";

export const HelloWorld = () => {
  return component().addChild(text("Hello world from external component"));
};
