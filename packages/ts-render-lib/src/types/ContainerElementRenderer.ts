import { ElementRenderer } from "@/types/ElementRenderer";

export interface ContainerElementRenderer extends ElementRenderer {
  addChild(child: ElementRenderer): ContainerElementRenderer;
}
