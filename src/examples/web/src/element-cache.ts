import { OnChangesFn, OnReadFn, Singleton, WatchThis } from './observed';
const getRandomId = () => Math.random() + '';
@Singleton()
export class ElementCache {
  cachedElementAttribute = 'c';
  constructor() {}
  elements: Record<string, HTMLElement> = {};

  handleCacheForElement<T extends HTMLElement>(
    element: T,
    onChange: OnChangesFn[],
    onRead: OnReadFn[]
  ): {
    exists?: boolean;
    element: HTMLElement & { addOnChange: (fn: OnChangesFn) => void; addOnRead: (fn: OnReadFn) => void };
  } {
    const cacheAttribute = element.getAttribute(this.cachedElementAttribute);
    if (!cacheAttribute) {
      element = WatchThis(element, onChange, onRead) as any as T;
      const identifier = getRandomId();
      element.setAttribute(this.cachedElementAttribute, identifier);
      this.elements[identifier] = element;
      return {
        element: element as T & { addOnChange: (fn: OnChangesFn) => void; addOnRead: (fn: OnReadFn) => void },
        exists: false,
      };
    }
    // @ts-ignore
    console.log(this.elements[cacheAttribute], this.elements[cacheAttribute].addOnChange);

    return {
      element: this.elements[cacheAttribute] as T & {
        addOnChange: (fn: OnChangesFn) => void;
        addOnRead: (fn: OnReadFn) => void;
      },
      exists: true,
    };
  }
}
export const elementCache = new ElementCache();
