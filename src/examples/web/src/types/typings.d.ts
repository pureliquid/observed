import {OnChangesFn, OnReadFn} from "../observed";

export declare global {
  export type _OnChangesFn = <T = any>(changes: keyof T[]) => void;
  export type _OnReadFn = <T>(keys: keyof T[]) => void;
  export type QuerySelector = <K extends keyof HTMLElementTagNameMap>(
    selectors: K,
    onChanges: _OnChangesFn[],
    onRead: _OnReadFn[]
  ) => HTMLElementTagNameMap[K] | null;

  export type QuerySelector = <K extends keyof SVGElementTagNameMap>(
    selectors: K,
    onChanges: _OnChangesFn[],
    onRead: _OnReadFn[]
  ) => SVGElementTagNameMap[K] | null;

  export type QuerySelector = <E extends Element = Element>(
    selectors: string,
    onChanges: _OnChangesFn[],
    onRead: _OnReadFn[]
  ) => E | null;

  export type OldQuerySelector = <K extends keyof HTMLElementTagNameMap>(
    selectors: K
  ) => HTMLElementTagNameMap[K] | null;

  export type OldQuerySelector = <K extends keyof SVGElementTagNameMap>(selectors: K) => SVGElementTagNameMap[K] | null;

  export type OldQuerySelector = <E extends Element = Element>(selectors: string) => E | null;
  interface Document {
    _oldQuerySelector: <K extends keyof HTMLElementTagNameMap>(selectors: K) => HTMLElementTagNameMap[K] | null;

    querySelector<K extends keyof HTMLElementTagNameMap>(
      selectors: K,
      onChanges?: _OnChangesFn[],
      onRead?: _OnReadFn[]
    ): HTMLElementTagNameMap[K & {addOnChange: (fn: OnChangesFn) => void, addOnRead: (fn: OnReadFn) => void}] | null;

    querySelector<K extends keyof SVGElementTagNameMap>(
      selectors: K,
      onChanges?: _OnChangesFn[],
      onRead?: _OnReadFn[]
    ): SVGElementTagNameMap[K & {addOnChange: (fn: OnChangesFn) => void, addOnRead: (fn: OnReadFn) => void}] | null;

    querySelector<E extends Element = Element>(
      selectors: string,
      onChanges?: _OnChangesFn[],
      onRead?: _OnReadFn[]
    ): E  & {addOnChange: (fn: OnChangesFn) => void, addOnRead: (fn: OnReadFn) => void} | null;
  }
}
