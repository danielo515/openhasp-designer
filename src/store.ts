import { createStore } from "solid-js/store";
import { DEFAULT_HEIGHT, DEFAULT_PADDING, DEFAULT_WIDTH } from "./constants";
import { createButton, createHaspLabel, HaspButton, HaspLabel } from "./openHasp";
import { parseJsonL } from "./parseJsonL";
import { getScreenDimensions, HaspScreenOrientation, Layout } from "./components/Screen";
import { toJsonL } from "./toJsonL";

type PageElement = HaspButton | HaspLabel;
type SelectedElement = { page: number; id: number };

const initialState = {
  currentPage: 1,
  pages: [] as PageElement[],
  layout: "horizontal" as HaspScreenOrientation,
  jsonL: "",
  selectedElement: { id: 0, page: 1 } as SelectedElement,
  get currentElement() {
    const idx = store.pages.findIndex(
      ({ id, page }) => id === store.selectedElement.id && page === this.selectedElement.page
    );
    const element = store.pages[idx];
    return element ? { ...element, index: idx } : null;
  },
  get currentPageElements() {
    return store.pages.filter((element) => element.page === this.currentPage || element.page === 0);
  },
};

export const [store, setStore] = createStore(initialState);

const getNextId = (page: number, elements: ReadonlyArray<PageElement>) => {
  const currentPageIds = elements
    .filter((element) => element.page === page)
    .map((element) => element.id)
    .concat(0);
  return Math.max(...currentPageIds) + 1;
};

export const setLayout = (layout: HaspScreenOrientation) => {
  setStore("layout", layout);
};

export const nextPage = () => {
  setStore("currentPage", (current) => current + 1);
};

export const prevPage = () => {
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

type CreateArgs = { obj: "btn"; text: string } | { obj: "label"; text: string };

export const createElement = (element: CreateArgs) => {
  setStore("pages", (pages) => {
    const id = getNextId(store.currentPage, pages);
    const layout = getScreenDimensions(store.layout);
    const columns = Math.round(layout.width / DEFAULT_WIDTH);
    const x = getDefaultX(id - 1, columns);
    const y = getDefaultY(id - 1, columns);
    const page = store.currentPage;
    switch (element.obj) {
      case "label": {
        return [
          ...pages,
          createHaspLabel({ ...element, id, page, x, y, w: DEFAULT_WIDTH, h: DEFAULT_HEIGHT }),
        ];
      }
      case "btn": {
        const text = element.text;
        return [
          ...pages,
          createButton({
            id,
            x,
            y,
            text,
            page,
            align: "center",
            mode: "expand",
            w: DEFAULT_WIDTH,
            h: DEFAULT_HEIGHT,
          }),
        ];
      }
    }
  });
};

export const importJsonL = (jsonL: string) => {
  const elements = parseJsonL<PageElement>(jsonL);
  setStore("pages", elements);
};

export const selectHaspElement = ({ page, id }: SelectedElement) => {
  setStore("selectedElement", { page, id });
};

export const deleteHaspElement = ({ page, id }: SelectedElement) => {
  setStore("pages", (pages) =>
    pages.filter(
      ({ id: elementId, page: elementPage }) => !(id === elementId && page === elementPage)
    )
  );
};

export const compile = () => {
  const output = toJsonL(store.pages);
  setStore("jsonL", output);
};
