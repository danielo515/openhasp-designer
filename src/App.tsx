import { CreateControls } from "./CreateControls";
import { Component, createSignal, For } from "solid-js";
import { Button } from "./components/Button";
import { ButtonsBottom } from "./components/ButtonsBottom";
import { NavigatePages } from "./components/NavigatePages";
import { ScreenButton } from "./components/ScreenElements/ScreenButton";
import Row from "./components/Row";
import { getScreenDimensions, Screen } from "./components/Screen";
import {
  store,
  nextPage,
  prevPage,
  createElement,
  compile,
  setLayout,
  importJsonL,
  selectHaspElement,
} from "./store";
import { PropEditor } from "./PropEditor";
import { ScreenLabel } from "./components/ScreenElements/ScreenLabel";

const App: Component = () => {
  const [jsonL, setJsonL] = createSignal("");
  const layout = () => getScreenDimensions(store.layout);
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
                setLayout("horizontal");
              } else {
                setLayout("vertical");
              }
            }}
          >
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
          </select>
          <NavigatePages currentPage={store.currentPage} onNext={nextPage} onPrev={prevPage} />
        </Row>
        <Screen {...layout()}>
          <For each={store.currentPageElements}>
            {(element) => {
              const onClick = () => selectHaspElement({ id: element.id, page: element.page });
              switch (element.obj) {
                case "btn":
                  return <ScreenButton {...element} onClick={onClick} />;
                case "label":
                  return <ScreenLabel {...element} onClick={onClick} />;
              }
            }}
          </For>
        </Screen>
        <ButtonsBottom>
          <Button label="Import" variant="primary" onClick={() => importJsonL(jsonL())} />
          <Button label="Export" variant="primary" onClick={compile} />
        </ButtonsBottom>
        <textarea
          class="export-area"
          onChange={(e) => {
            console.log(e.currentTarget.value);
            setJsonL(e.currentTarget.value);
          }}
          value={store.jsonL}
        />
      </main>
      <div class="w-full h-full border-l-2 border-cyan-700 ">
        <div class="h-1/3 p-4 grid sm:grid-cols-5 sm:gap-1 grid-cols-2 gap-2 ">
          <CreateControls createElement={createElement} />
        </div>
        <div class="h-2/3 p-4 border-cyan-700 border-t-2 bg-gray-600 shadow-inner overflow-y-auto">
          <PropEditor />
        </div>
      </div>
    </div>
  );
};

export default App;
