import { Observable, Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

console.clear();

const o1 = new Observable<number>((observer) => {
  let counter = 0;
  const eventClickListener = () => {
    counter++;
    console.warn('esemény emittálás');
    observer.next(counter);
  };
  document
    .querySelector('#event-square')
    .addEventListener('click', eventClickListener);

  const errorClickListener = () => {
    console.warn('hiba emittálás');
    observer.error('Hiba történt.');
  };

  document
    .querySelector('#error')
    .addEventListener('click', errorClickListener);

  const completeClickListener = () => {
    console.warn('complete emittálás');
    observer.complete();
  };
  document
    .querySelector('#complete')
    .addEventListener('click', completeClickListener);

  return () => {
    document
      .querySelector('#event-square')
      .removeEventListener('click', eventClickListener);
    document
      .querySelector('#error')
      .removeEventListener('click', errorClickListener);
    document
      .querySelector('#complete')
      .removeEventListener('click', completeClickListener);
  };
}).pipe(
  tap((e) => console.warn('Tap into observable: ', e)),
  map((e) => e + 1)
);

const s = new Subject();

o1.subscribe(s);

// o1.subscribe(
//  (res) => console.warn('Observable emits', res),
//  (err) => console.warn('Observable error', err)
//);

//const subscription = o1.subscribe(
const subscription = s.pipe(filter((e) => e % 2 === 0)).subscribe(
  (res) => {
    console.warn('Observable emits', res);
    if (res === 5) {
      subscription.unsubscribe();
    }
  },
  (err) => console.warn('Observable error', err),
  () => console.warn('Observable completed')
);

//const subscription2 = o1.subscribe(
const subscription2 = s.subscribe(
  (res) => {
    console.warn('Observable emits', res);
    if (res === 5) {
      subscription.unsubscribe();
    }
  },
  (err) => console.warn('Observable error', err),
  () => console.warn('Observable completed')
);
