import './query-selector.polyfill';
import { elementCache } from './element-cache';
// import './element-cache';
// TODO: find way to reuse but dont reuse onChange!
window.onload = () => {
  const cls = document.querySelector('#one');
  if (!cls) {
    return;
  }
  cls.addOnChange(function (read: keyof HTMLElement[]) {
    console.log('change 1337', read);
  });

  cls.addOnRead(function (read: keyof HTMLElement[]) {
    console.log('read 1337', read);
  });
  console.log(cls.id);
  cls.innerHTML = 'qdw';
  console.log(elementCache.elements);
  /*console.log('OK: ', cls.getAttribute('id'));
      cls.setAttribute('test', '1337');*/
  cls.setAttribute('test', '1337');
  console.log(cls.id);
};
