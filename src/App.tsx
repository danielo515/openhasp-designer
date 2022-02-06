import { Component, createSignal } from "solid-js";
import { Button } from "./Button";
import { ButtonsBottom } from "./components/ButtonsBottom";
import { NavigatePages } from "./components/NavigatePages";
import { createButton } from "./haspButton";
import { parseJsonL } from "./parseJsonL";
import Row from "./Row";
import { Screen } from "./Screen";
import Store from "./store";
import { toJsonL } from "./toJsonL";

const verticalLayout = { height: 400, width: 300, tag: "vertical" } as const;
const horizontalLayout = {
  height: 300,
  width: 400,
  tag: "horizontal",
} as const;

export type Layout = typeof verticalLayout | typeof horizontalLayout;

const { store, nextPage, prevPage, addElement, compile } = Store;

const App: Component = () => {
  const [jsonL, setJsonL] = createSignal("");
  const [elements, setElements] = createSignal([]);
  const [layout, setLayout] = createSignal<Layout>(horizontalLayout);

  const onImport = () => {
    const elements = parseJsonL(jsonL());
    console.log({ elements });
    setElements(elements);
  };
  const onExport = () => {
    const exportStr = toJsonL(elements());
    setJsonL(exportStr);
  };
  return (
    <div class="main-wrapper">
      <main class="w-full h-full p-4 flex flex-col items-center">
        <Row>
          <select
            value={layout().tag}
            class="select"
            onChange={(e) => {
              console.log(e.currentTarget.value);
              if (e.currentTarget.value === "horizontal") {
                setLayout(horizontalLayout);
              } else {
                setLayout(verticalLayout);
              }
            }}
          >
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
          </select>
          <NavigatePages
            currentPage={store.currentPage}
            onNext={nextPage}
            onPrev={prevPage}
          />
        </Row>
        <Screen {...layout()} />
        <ButtonsBottom>
          <Button label="Import" onClick={onImport} />
          <Button label="Export" onClick={compile} />
        </ButtonsBottom>
        <textarea
          class="textarea w-full"
          onChange={(e) => {
            console.log(e.currentTarget.value);
            setJsonL(e.currentTarget.value);
          }}
          value={store.jsonL}
        />
      </main>
      <div class="w-full h-full border-l-2 border-cyan-700 ">
        <div class="h-1/2 p-4">
          <Button
            label="Button"
            onClick={() => {
              addElement(createButton({ text: "Button" }));
            }}
          />
        </div>
        <div class="h-1/2 p-4 border-cyan-700 border-t-2 bg-gray-600 shadow-inner">
          bottom
        </div>
      </div>
    </div>
  );
};

export default App;
