import { DragOnCubeEvent } from '../DragOnCubeEvent';

window.addEventListener('cubedragstart', () => {
  function pointerMoveEvent() {
    window.dispatchEvent(new DragOnCubeEvent('cubedragon'));
  }

  window.addEventListener('pointermove', pointerMoveEvent);

  window.addEventListener('cubedragend', () => {
    window.removeEventListener('pointermove', pointerMoveEvent);
  });
});
