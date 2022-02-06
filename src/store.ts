import { createStore } from "solid-js/store";

const initialState = {
  currentPage: 1,
  pages: [],
  layout: "horizontal",
};

const [store, setStore] = createStore(initialState);

const nextPage = () => {
  setStore("currentPage", (current) => current + 1);
};
const prevPage = () => {
  setStore("currentPage", (current) => Math.max(current - 1, 1));
};

export default {
  store,
  nextPage,
  prevPage,
};
