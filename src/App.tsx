import ScreenArea from "./ScreenArea";
import { CreateControls } from "./CreateControls";
import { Component, createSignal, Match, Switch } from "solid-js";
import { Button } from "./components/Button";
import { ButtonsBottom } from "./components/ButtonsBottom";
import { getScreenDimensions } from "./components/Screen";
import { store, createElement, compile, setLayout, importJsonL } from "./store";
import { PropEditor } from "./PropEditor";
import { Tab, Tabs } from "./components/Tabs/Tabs";
import { Card, CardHeader } from "./components/Card";
import { navigateTopFrame, router } from "./router";

const App: Component = () => {
  const [jsonL, setJsonL] = createSignal("");
  const layout = () => getScreenDimensions(store.layout);
  return (
    <>
      <div class="main-wrapper">
        <main class="w-full h-full p-4 flex flex-col items-center">
          <ScreenArea layout={layout} />
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
                <Tab
                  isActive={router.topFrame == "controls"}
                  onClick={() => navigateTopFrame("controls")}
                >
                  Controls
                </Tab>
                <Tab
                  isActive={router.topFrame == "settings"}
                  onClick={() => navigateTopFrame("settings")}
                >
                  Settings
                </Tab>
              </Tabs>
            </CardHeader>
            <div class="h-1/3 p-4 grid sm:grid-cols-5 sm:gap-1 grid-cols-2 gap-2 ">
              <Switch>
                <Match when={router.topFrame === "controls"}>
                  <CreateControls createElement={createElement} />
                </Match>
                <Match when={router.topFrame === "settings"}>
                  <div class="">Settings</div>
                </Match>
              </Switch>
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
