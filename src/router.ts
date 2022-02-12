import { createStore } from "solid-js/store";

type topPaths = "controls" | "settings";

const initialState = {
  topFrame: "controls" as topPaths,
};

export const [router, setRouter] = createStore(initialState);

export const navigateTopFrame = (path: topPaths) => {
  setRouter("topFrame", path);
};
