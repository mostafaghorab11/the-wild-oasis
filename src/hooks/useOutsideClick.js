import { useEffect, useRef } from 'react';

// when listenCapturing is true, the event listener will capture the event at the root level
// so it will be more performant
// if false, the event listener will bubble up to the parent elements
// and won't open the modal
export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener('click', handleClick, listenCapturing);

      return () =>
        document.removeEventListener('click', handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
