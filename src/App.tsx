import { Component, createSignal } from "solid-js";
import { Button } from "./Button";
import { ButtonsBottom } from "./ButtonsBottom";
import { createButton } from "./haspButton";
import { parseJsonL } from "./parseJsonL";
import { Screen } from "./Screen";
import { toJsonL } from "./toJsonL";

const verticalLayout = { height: 400, width: 300 } as const;
const horizontalLayout = { height: 300, width: 400 } as const;

type Layout = typeof verticalLayout | typeof horizontalLayout;

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
        <select
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
        <Screen {...layout()} />
        <ButtonsBottom>
          <Button label="Import" onClick={onImport} />
          <Button label="Export" onClick={onExport} />
        </ButtonsBottom>
        <textarea
          class="textarea w-full"
          onChange={(e) => {
            console.log(e.currentTarget.value);
            setJsonL(e.currentTarget.value);
          }}
          value={jsonL()}
        />
      </main>
      <div class="w-full h-full border-l-2 border-cyan-700 ">
        <div class="h-1/2 p-4">
          <Button
            label="Button"
            onClick={() => {
              setElements((elements) => [
                ...elements,
                createButton({ id: elements.length, text: "Button" }),
              ]);
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
