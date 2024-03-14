export function render() {
  const root = document.querySelector("#app");
  root?.appendChild(document.createTextNode("Hello, World from lib"));
}
