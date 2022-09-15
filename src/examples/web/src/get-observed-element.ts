import { elementCache } from './element-cache';
import { OnChangesFn, OnReadFn, WatchThis } from './observed';

export const getObservedElement = <T extends HTMLElement>(
  elementOrSelector: T | null | string,
  onChange: OnChangesFn[],
  onRead: OnReadFn[]
): T => {
  let _element: T | null = elementOrSelector as T;
  if (typeof elementOrSelector === 'string') {
    _element = document.querySelector(elementOrSelector) as T;
  }
  if (!_element) {
    throw new Error('Missing DOM Element!!');
  }
  const { exists, element } = elementCache.handleCacheForElement(_element, onChange, onRead);
  if (exists) {
    console.log('exists!!', element.addOnRead, element);
    for (const fn of onRead) {
      element.addOnRead(fn);
    }
    for (const fn of onChange) {
      element.addOnChange(fn);
    }
  } else {
    return element as any as T;
  }

  return WatchThis(element, onChange, onRead) as any as T;
};
