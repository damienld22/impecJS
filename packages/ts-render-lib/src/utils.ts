export function isHTMLElement(elt: Element | DocumentFragment): elt is Element {
  return !!(elt as any).setAttribute;
}
