import { setStore } from "./store";
export const initialSettings = {
  defaultWidth: 60,
  defaultHeight: 60,
  padding: 2,
};

export const setDefaultWidth = (width: number) => {
  setStore("settings", "defaultWidth", width);
};

export const setDefaultHeight = (height: number) => {
  setStore("settings", "defaultHeight", height);
};

export const setPadding = (padding: number) => {
  setStore("settings", "padding", padding);
};
