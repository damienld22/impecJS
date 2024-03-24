import {
  computed,
  ReadSignal,
  root,
  signal,
  WriteSignal,
} from "@maverick-js/signals";
import { BaseContainerElementRenderer } from "@/GenericElements/BaseContainerElementRenderer";

export class Component<T> extends BaseContainerElementRenderer {
  props?: T;

  constructor(props?: T) {
    super();
    this.props = props;
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

  onMounted(callback: () => void) {
    this.onMountedCallback = callback;
  }

  onDestroyed(callback: () => void) {
    this.onDestroyedCallback = callback;
  }
}
