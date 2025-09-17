import { createStore } from "solid-js/store";

const [state, setState] = createStore({
  baudRate: 115200,
  portStatus: false,
});

export { state, setState };