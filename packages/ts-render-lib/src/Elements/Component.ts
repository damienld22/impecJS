import {
  computed,
  ReadSignal,
  root,
  signal,
  WriteSignal,
} from "@maverick-js/signals";
import { BaseContainerElementRenderer } from "@/AbstractsElements/BaseContainerElementRenderer";

export class Component extends BaseContainerElementRenderer {
  constructor() {
    super();
  }

  addState<T>(value: T): [WriteSignal<T>, (v: T) => void] {
    return root((dispose) => {
      const $state = signal<T>(value);

      this.current.addEventListener("destroy", () => {
        dispose();
      });

      const setter = (value: T) => {
        $state.set(value);
      };
      return [$state, setter];
    });
  }

  addComputed<T>(callback: () => T): ReadSignal<T> {
    return root((dispose) => {
      this.current.addEventListener("destroy", () => {
        dispose();
      });

      return computed(callback);
    });
  }
}
