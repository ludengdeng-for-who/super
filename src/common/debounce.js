export function debounce(func, delay) {
    let timer = null;
    return function(...agrs) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, agrs);
      }, delay);
    };
  }