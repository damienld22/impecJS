export interface ElementRenderer {
  render(): void;
  setParent(parent: HTMLElement): void;
  style(style: string): ElementRenderer;
  class(className: string): ElementRenderer;
  addChild(child: ElementRenderer): ElementRenderer;
  setCurrent(htmlElement: HTMLElement): void;
  setTextContent(text: string): ElementRenderer;
  addElementListener(name: string, listener: EventListener): ElementRenderer;
}
