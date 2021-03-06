import { createStore } from "solid-js/store";
import {
  BasicObj,
  createBasicObject,
  createButton,
  createHaspLabel,
  createHaspSwitch,
  HaspButton,
  HaspLabel,
  HaspSwitch,
} from "../openHasp";
import { parseJsonL } from "../parseJsonL";
import { getScreenDimensions, HaspScreenOrientation, Layout } from "../components/Screen";
import { toJsonL } from "../toJsonL";
import { initialSettings } from "./settings";
import { createProgressBar, ProgressBar } from "../openHasp/ProgressBar";

type PageElement = HaspButton | HaspLabel | HaspSwitch | BasicObj | ProgressBar;
type SelectedElement = { page: number; id: number };

const initialState = {
  currentPage: 1,
  pages: [] as PageElement[],
  layout: "horizontal" as HaspScreenOrientation,
  jsonL: "",
  settings: initialSettings,
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
  const padding = store.settings.padding * (column + 1);
  const x = store.settings.defaultWidth * column + padding;
  return x;
};

const getDefaultY = (position: number, columns: number) => {
  const row = Math.floor(position / columns);
  const padding = store.settings.padding * (row + 1);
  const y = store.settings.defaultHeight * row + padding;
  return y;
};

type CreateArgs =
  | { obj: "btn"; text: string }
  | { obj: "label"; text: string }
  | { obj: "switch" }
  | { obj: "bar" }
  | { obj: "obj" };

export const createElement = (element: CreateArgs) => {
  setStore("pages", (pages) => {
    const id = getNextId(store.currentPage, pages);
    const layout = getScreenDimensions(store.layout);
    const { defaultWidth: width, defaultHeight: height } = store.settings;
    const columns = Math.floor(layout.width / (width + store.settings.padding));
    const x = getDefaultX(id - 1, columns);
    const y = getDefaultY(id - 1, columns);
    const page = store.currentPage;
    switch (element.obj) {
      case "obj":
        return pages.concat(createBasicObject({ id, x, y, w: width, h: height, page }));
      case "bar":
        return pages.concat(createProgressBar({ id, x, y, w: width, h: width / 3, page }));
      case "label": {
        return [
          ...pages,
          createHaspLabel({
            ...element,
            id,
            page,
            x,
            y,
            w: width,
            h: height,
          }),
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
            w: width,
            h: height,
          }),
        ];
      }
      case "switch": {
        return [
          ...pages,
          createHaspSwitch({
            id,
            page,
            x,
            y,
            w: width,
            h: width / 2,
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
  setStore("selectedElement", { id: 0, page: 1 });
};

export const compile = () => {
  const output = toJsonL(store.pages);
  setStore("jsonL", output);
};
