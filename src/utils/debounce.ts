function debounce(callback: (...args: any[]) => void, delay: number) {
  let timer: number | null;

  return function(...args: any[]) {
    if (timer) {
      return;
    }

    callback(...args);

    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
}

export { debounce };
