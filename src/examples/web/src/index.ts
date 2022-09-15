import { WatchThis } from './observed';
import './index.html';
import './element-cache';
import { elementCache } from './element-cache';
import { getObservedElement } from './get-observed-element';
// TODO: find way to reuse but dont reuse onChange!
window.onload = () => {
  const one = document.getElementById('one');
  const cls = getObservedElement(
    '#one',
    [
      function (changes: keyof HTMLElement[]) {
        console.log('changes 1337', changes);
      },
    ],
    [
      function (read: keyof HTMLElement[]) {
        console.log('read 1337', read);
      },
    ]
  );
  const cls2 = getObservedElement(
    '#one',
    [
      function (changes: keyof HTMLElement[]) {
        console.log('me too change!!', changes);
      },
    ],
    [
      function (changes: keyof HTMLElement[]) {
        console.log('me too read!!', changes);
      },
    ]
  );
  console.log(cls.id);

  /*console.log('OK: ', cls.getAttribute('id'));
  cls.setAttribute('test', '1337');*/
  cls.setAttribute('test', '1337');
  console.log(cls.id);
};
