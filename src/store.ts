import { createStore } from "solid-js/store";
import { DEFAULT_HEIGHT, DEFAULT_PADDING, DEFAULT_WIDTH } from "./constants";
import { HaspButton } from "./haspButton";
import { getScreenDimensions, HaspScreenOrientation, Layout } from "./Screen";

type PageElement = HaspButton;

const initialState = {
  currentPage: 1,
  pages: [] as PageElement[],
  layout: "horizontal" as HaspScreenOrientation,
  jsonL: "",
  get currentPageElements() {
    return store.pages.filter(
      (element) => element.page === this.currentPage || element.page === 0
    );
  },
};

const [store, setStore] = createStore(initialState);

const getNextId = (page: number, elements: ReadonlyArray<PageElement>) => {
  const currentPageIds = elements
    .filter((element) => element.page === page)
    .map((element) => element.id)
    .concat(0);
  return Math.max(...currentPageIds) + 1;
};

const setLayout = (layout: HaspScreenOrientation) => {
  setStore("layout", layout);
};

const nextPage = () => {
  setStore("currentPage", (current) => current + 1);
};

const prevPage = () => {
  setStore("currentPage", (current) => Math.max(current - 1, 1));
};

const getDefaultX = (position: number, { width }: Layout) => {
  const padding = DEFAULT_PADDING + position;
  const x = DEFAULT_WIDTH * position + padding;
  if (x > width) return 0 + DEFAULT_PADDING;
  return x;
};

const getDefaultY = (position: number, { height }: Layout) => {
  return DEFAULT_HEIGHT * position + DEFAULT_PADDING;
};

const addElement = (element: PageElement) => {
  setStore("pages", (pages) => {
    const id = getNextId(store.currentPage, pages);
    const layout = getScreenDimensions(store.layout);
    const x = element.x ?? getDefaultX(id - 1, layout);
    const y = element.y ?? getDefaultY(id - 1, layout);
    return [
      ...pages,
      {
        ...element,
        x,
        y,
        id,
        page: store.currentPage,
      },
    ];
  });
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
  setLayout,
};
