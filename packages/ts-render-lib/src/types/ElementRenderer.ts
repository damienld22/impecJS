export interface ElementRenderer {
  render(): void;
  setParent(parent: HTMLElement): void;
  style(style: string): ElementRenderer;
  addChild(child: ElementRenderer): ElementRenderer;
  setCurrent(htmlElement: HTMLElement): void;
}
