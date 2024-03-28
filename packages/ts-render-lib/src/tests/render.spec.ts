import { describe, expect, it, beforeEach, afterEach } from "vitest";
import {
  app,
  button,
  component,
  div,
  element,
  text,
  computed,
  state,
} from "@/index";

const getRender = () => document.querySelector("#app")?.innerHTML;

describe("Test render of component", () => {
  beforeEach(() => {
    const appDiv = document.createElement("div");
    appDiv.setAttribute("id", "app");
    document.body.appendChild(appDiv);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Basic components", () => {
    it("Empty component", () => {
      app().render();

      expect(getRender()).toEqual("");
    });

    it("Empty div", () => {
      app().addChild(div()).render();
      expect(getRender()).toEqual("<div></div>");
    });

    it("One text", () => {
      app().addChild(text("Hello world")).render();
      expect(getRender()).toEqual("<span>Hello world</span>");
    });

    it("Set text content", () => {
      app().addChild(div().textContent("toto")).render();

      expect(getRender()).toEqual("<div>toto</div>");
    });

    it("Custom element", () => {
      app().addChild(element("code").textContent("toto")).render();

      expect(getRender()).toEqual("<code>toto</code>");
    });
  });

  describe("Nested components", () => {
    it("Text in div", () => {
      app()
        .addChild(div().addChild(text("Hello world")))
        .render();
      expect(getRender()).toEqual("<div><span>Hello world</span></div>");
    });

    it("Button in div", () => {
      app()
        .addChild(div().addChild(button("Hello world")))
        .render();
      expect(getRender()).toEqual("<div><button>Hello world</button></div>");
    });

    it("Nested element in multiple div", () => {
      app()
        .addChild(div().addChild(div().addChild(text("Hello world"))))
        .render();
      expect(getRender()).toEqual(
        "<div><div><span>Hello world</span></div></div>"
      );
    });
  });

  describe("Attributes", () => {
    it("Id attribute", () => {
      app().addChild(text("toto").attribute("id", "toto")).render();

      expect(getRender()).toEqual('<span id="toto">toto</span>');
    });

    it("class attribute", () => {
      app().addChild(text("toto").class("class1")).render();

      expect(getRender()).toEqual('<span class="class1">toto</span>');
    });

    it("style attribute", () => {
      app().addChild(text("toto").style("border: 1px")).render();

      expect(getRender()).toEqual('<span style="border: 1px">toto</span>');
    });
  });

  describe("Event listeners", () => {
    it("Click event", () => {
      let count = 0;

      app()
        .addChild(button("click").onClick(() => count++))
        .render();

      const btn = document.querySelector("button");
      btn?.dispatchEvent(new MouseEvent("click"));

      expect(getRender()).toEqual("<button>click</button>");
      expect(count).toEqual(1);
    });
  });

  describe("Signal / computed values", () => {
    it("Computed attribute and signal value", async () => {
      const cpt = component();
      const [counter, setCounter] = state<number>(0);
      const computedStyle = computed<string>(
        () => `padding: 5px; color: ${counter() > 0 ? "green" : "red"};`
      );
      const computedClass = computed<string>(() =>
        counter() > 0 ? "text-bold" : "text-italic"
      );

      cpt
        .addChild(button("-").onClick(() => setCounter(counter() - 1)))
        .addChild(text(counter).class(computedClass).style(computedStyle))
        .addChild(button("+").onClick(() => setCounter(counter() + 1)));

      app().addChild(cpt).render();

      // Default case, 0 is red and italic
      expect(getRender()).toEqual(
        '<button>-</button><span class="text-italic" style="padding: 5px; color: red;">0</span><button>+</button>'
      );

      // Increment, 1 is green and bold
      const btnPlus = document.querySelectorAll("button")[1];
      btnPlus?.dispatchEvent(new MouseEvent("click"));

      // Simulate async update
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(getRender()).toEqual(
        '<button>-</button><span class="text-bold" style="padding: 5px; color: green;">1</span><button>+</button>'
      );
    });
  });

  describe("Lifecycle", () => {
    it("onMounted", () => {
      let count = 0;
      const cpt = component();

      cpt.onMounted(() => {
        count++;
      });

      app().addChild(cpt).render();

      expect(count).toEqual(1);
    });

    it("onDestroyed", () => {
      let count = 0;

      const cpt = component();
      cpt.addChild(text("Hello World"));

      cpt.onDestroyed(() => {
        count++;
      });

      app().addChild(cpt).render();

      cpt.destroy();
      expect(count).toEqual(1);
    });
  });
});
