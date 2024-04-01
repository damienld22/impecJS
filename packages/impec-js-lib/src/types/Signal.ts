import type { ReadSignal, WriteSignal } from "@maverick-js/signals";

export type Signal<T> = WriteSignal<T> | ReadSignal<T>;
export type SignalOrValue<T> = T | Signal<T>;
