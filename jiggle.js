const depsMap = new Map();
let currentEffect = null;
const effectStack = [];

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
  if (currentEffect) {
    console.log(target, key);
    let deps = depsMap.get(target);
    if (!deps) {
      deps = new Map();
      deps.set(target, deps);
    }
    let dep = deps.get(key);
    if (!dep) {
      deps.set(key, (dep = new Set()));
    }
    dep.add(currentEffect);
  }
}

function createEffect(fn) {
  const effect = function effect(...args) {
    if (effectStack.indexOf(effect) === -1) {
      try {
        createEffect = effect;
        effectStack.push(effect);
        return fn(...args);
      } finally {
        effectStack.pop();
        createEffect = effectStack[effectStack.length - 1];
      }
    }
  };
  effect();
}

function trigger(target, key) {
  const deps = depsMap.get(target);

  if (!deps) return;
  const dep = deps.get(key);

  if (dep) {
    const effectToRun = new Set(dep);
    effectToRun.forEach((effect) => effect());
  }

  // console.log(target, key);
  // renderApp();
}
