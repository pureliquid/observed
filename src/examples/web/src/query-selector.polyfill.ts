// type TestArguments = ArgumentTypes<typeof test>;

import { elementCache } from './element-cache';
import { OnChangesFn, OnReadFn, WatchThis } from './observed/index';

document._oldQuerySelector = document.querySelector as OldQuerySelector;

document.querySelector = function (
  selector: any,
  onRead: OnReadFn[] = [],
  onChange: OnChangesFn[] = []
): ReturnType<QuerySelector> {
  const _element: ReturnType<QuerySelector> = document._oldQuerySelector(selector);
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
    return element as any as ReturnType<QuerySelector>;
  }

  return WatchThis(element, onChange, onRead) as any as ReturnType<QuerySelector>;
};
