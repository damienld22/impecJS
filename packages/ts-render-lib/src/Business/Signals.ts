import {
  computed as createComputed,
  effect as createEffect,
  ReadSignal,
  signal,
  WriteSignal,
} from "@maverick-js/signals";

export function state<T>(value: T): [WriteSignal<T>, (v: T) => void] {
  const $state = signal<T>(value);
  const setter = (value: T) => {
    $state.set(value);
  };

  return [$state, setter];
}

export function computed<T>(callback: () => T): ReadSignal<T> {
  return createComputed(callback);
}

export function effect(callback: () => void) {
  return createEffect(callback);
}
