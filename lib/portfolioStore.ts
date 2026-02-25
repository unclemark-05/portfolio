"use client";

import { useSyncExternalStore } from "react";

interface PortfolioState {
  preloaderDone: boolean;
  scrollProgress: number;
  scrollDirection: "up" | "down";
  loadProgress: number;
}

let state: PortfolioState = {
  preloaderDone: false,
  scrollProgress: 0,
  scrollDirection: "down",
  loadProgress: 0,
};

type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((l) => l());
}

export function getPortfolioState() {
  return state;
}

export function setPreloaderDone(done: boolean) {
  state = { ...state, preloaderDone: done };
  notify();
}

export function setScrollProgress(progress: number) {
  state = { ...state, scrollProgress: progress };
  notify();
}

export function setScrollDirection(dir: "up" | "down") {
  state = { ...state, scrollDirection: dir };
  notify();
}

export function setLoadProgress(progress: number) {
  state = { ...state, loadProgress: progress };
  notify();
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function usePortfolioStore<T>(selector: (s: PortfolioState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(getPortfolioState()),
    () => selector(getPortfolioState())
  );
}
