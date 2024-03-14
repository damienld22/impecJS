import { BaseContainerElementRenderer } from "@/AbstractsElements/BaseContainerElementRenderer";

export class Div extends BaseContainerElementRenderer {}

export const div = () => new Div();
