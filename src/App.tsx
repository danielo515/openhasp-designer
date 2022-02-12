import SelectLayout from "./SelectLayout";
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
import { Tab, Tabs } from "./components/Tabs/Tabs";
import { Card, CardHeader } from "./components/Card";

const App: Component = () => {
  const [jsonL, setJsonL] = createSignal("");
  const layout = () => getScreenDimensions(store.layout);
  return (
    <>
      <div class="main-wrapper">
        <main class="w-full h-full p-4 flex flex-col items-center">
          <Row>
            <SelectLayout setLayout={setLayout} layout={layout} />
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
        <div class="w-full h-full flex flex-col">
          <Card class="flex-1 border-t-0" layout="column">
            <CardHeader>
              <Tabs class="-ml-px">
                <Tab isActive>Controls</Tab>
                <Tab>Settings</Tab>
              </Tabs>
            </CardHeader>
            <div class="h-1/3 p-4 grid sm:grid-cols-5 sm:gap-1 grid-cols-2 gap-2 ">
              <CreateControls createElement={createElement} />
            </div>
          </Card>
          <Card class="h-2/3 bg-gray-600" layout="row" borders={{ top: false }}>
            <PropEditor />
          </Card>
        </div>
      </div>
      <footer class="p-2 footer bg-neutral text-neutral-content z-10">
        <div>
          <p>Danielo Rodriguez 2022</p>
        </div>
      </footer>
    </>
  );
};

export default App;
