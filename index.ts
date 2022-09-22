import { Observable } from 'rxjs';

console.clear();

const o1 = new Observable((observer) => {
  let counter = 0;
  document.querySelector('#event-square').addEventListener('click', () => {
    counter++;
    observer.next(counter);
  });
});

o1.subscribe((res) => console.warn('Observable emits', res));
