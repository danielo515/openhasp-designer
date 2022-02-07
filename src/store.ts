import { createStore } from "solid-js/store";
import { DEFAULT_HEIGHT, DEFAULT_PADDING, DEFAULT_WIDTH } from "./constants";
import { HaspButton } from "./haspButton";
import { getScreenDimensions, HaspScreenOrientation, Layout } from "./Screen";
import { toJsonL } from "./toJsonL";

type PageElement = HaspButton;
type SelectedElement = { page: number; id: number };

const initialState = {
  currentPage: 1,
  pages: [] as PageElement[],
  layout: "horizontal" as HaspScreenOrientation,
  jsonL: "",
  selectedElement: { id: 0, page: 1 } as SelectedElement,
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

const getDefaultX = (position: number, columns: number) => {
  const column = Math.round(position % columns);
  const padding = DEFAULT_PADDING + column;
  const x = DEFAULT_WIDTH * column + padding;
  return x;
};

const getDefaultY = (position: number, columns: number) => {
  const row = Math.floor(position / columns);
  const padding = DEFAULT_PADDING + row;
  const y = DEFAULT_HEIGHT * row + padding;
  return y;
};

const addElement = (element: PageElement) => {
  setStore("pages", (pages) => {
    const id = getNextId(store.currentPage, pages);
    const layout = getScreenDimensions(store.layout);
    const columns = Math.round(layout.width / DEFAULT_WIDTH);
    const x = element.x ?? getDefaultX(id - 1, columns);
    const y = element.y ?? getDefaultY(id - 1, columns);
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

export const selectHaspElement = ({ page, id }: SelectedElement) => {
  setStore("selectedElement", { page, id });
};

const compile = () => {
  const output = toJsonL(store.pages);
  setStore("jsonL", output);
};

export default {
  store,
  nextPage,
  prevPage,
  addElement,
  compile,
  setLayout,
  selectHaspElement,
};
