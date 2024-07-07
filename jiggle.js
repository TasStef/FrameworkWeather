function render(element, content) {
  const app = document.querySelector(element);
  if (app !== null) {
    app.innerHTML = content;
  }
}

function reactive(obj) {
  const keys = Object.keys(obj);
  const reactiveObj = {};

  keys.forEach((key) => {
    let value = obj[key];
    Object.defineProperty(reactiveObj, key, {
      get() {
        console.log(`Getting Value: ${value}`);
        track(reactiveObj, key);
        return value;
      },
      set(newValue) {
        console.log(`Setting Value: ${newValue}`);
        if (newValue !== value) {
          value = newValue;
          trigger(reactiveObj, key);
        }
      },
    });
  });

  return reactiveObj;
}

function track(target, key) {
  console.log(target, key);
}

function trigger(target, key) {
  console.log(target, key);
  renderApp();
}
