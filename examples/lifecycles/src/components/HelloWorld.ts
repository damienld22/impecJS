import { component, text } from "ts-render-lib";

const cpt = component();

export const HelloWorld = () => {
  cpt.addChild(text("Hello World"));

  cpt.onMounted(() => {
    console.log("Component is mounted");
  });

  cpt.onDestroyed(() => {
    console.log("Component is destroyed");
  });

  setTimeout(() => {
    cpt.destroy();
  }, 1000);

  return cpt;
};
