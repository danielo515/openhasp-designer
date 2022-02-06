import { createStore } from "solid-js/store";
import { HaspButton } from "./haspButton";

type PageElement = HaspButton;

const initialState = {
  currentPage: 1,
  pages: [] as PageElement[],
  layout: "horizontal",
  jsonL: "",
  get currentPageElements() {
    return this.pages.filter(
      (element) => element.page === this.currentPage || element.page === 0
    );
  },
};

const [store, setStore] = createStore(initialState);

const getNextId = (page: number) => {
  const currentPageIds = store.pages
    .filter((element) => element.page === page)
    .map((element) => element.id)
    .concat(0);
  return Math.max(...currentPageIds) + 1;
};

const nextPage = () => {
  setStore("currentPage", (current) => current + 1);
};

const prevPage = () => {
  setStore("currentPage", (current) => Math.max(current - 1, 1));
};

const addElement = (element) => {
  setStore("pages", (pages) => [
    ...pages,
    { ...element, id: getNextId(store.currentPage), page: store.currentPage },
  ]);
};

const compile = () => {
  const output = store.pages.map((element) => JSON.stringify(element));
  setStore("jsonL", output.join("\n"));
};

export default {
  store,
  nextPage,
  prevPage,
  addElement,
  compile,
};
