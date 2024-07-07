let state = reactive({ message: "Hello Universe!" });
// let message = "Hello Universe!";

function renderApp() {
  render("#container", `<h1>${state.message}</h1>`);
}

renderApp();

setTimeout(() => {
  state.message = "Hello world!";
}, 1000);
