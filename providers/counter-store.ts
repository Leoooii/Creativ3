"use client";

// import { createStore } from "zustand/vanilla";
import { create } from "zustand";

export type CounterState = {
  count: number;
};
export type CounterActions = {
  decrementCount: () => void;
  incrementCount: () => void;
};

export type CounterStore = CounterState & CounterActions;

export const defaultInitState: CounterState = {
  count: 0,
};

export const createCounterStore = (
  initState: CounterState = defaultInitState,
) => {
  return create<CounterStore>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
  }));
};
