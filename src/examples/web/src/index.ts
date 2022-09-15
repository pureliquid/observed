import { WatchThis } from './observed';
import './index.html';

const getObservedElement = <T extends HTMLElement>(elementOrSelector: T | null | string): T => {
  // TODO: CACHE INSTANCES!!
  let element: T | null = elementOrSelector as T;
  if (typeof elementOrSelector === 'string') {
    element = document.querySelector(elementOrSelector) as T;
  }
  if (!element) {
    throw new Error('Missing DOM Element!!');
  }
  return WatchThis(
    element,
    function (changes: keyof T[]) {
      console.log('changes ', changes);
    },
    function (read: keyof T[]) {
      console.log('read ', read);
    }
  ) as T;
};

window.onload = () => {
  const one = document.getElementById('one');
  const cls = getObservedElement('#one');
  console.log(cls.id);
  console.log('OK: ', cls.getAttribute('id'));
  cls.setAttribute('test', '1337');
};
