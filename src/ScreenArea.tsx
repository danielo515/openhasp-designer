import Row from "./components/Row";
import { Screen } from "./components/Screen";
import { ScreenLabel } from "./components/ScreenElements/ScreenLabel";
import { ScreenButton } from "./components/ScreenElements/ScreenButton";
import { NavigatePages } from "./components/NavigatePages";
import SelectLayout from "./SelectLayout";
import { store, nextPage, prevPage, setLayout, selectHaspElement } from "./store/store";
import { For } from "solid-js";
import { ScreenSwitch } from "./components/ScreenElements/ScreenSwitch";
import { ScreenBasicObj } from "./components/ScreenElements/ScreenBasicObj";
import { ScreenProgressBar } from "./openHasp/ProgressBar";

export default function ScreenArea({ layout }) {
  return (
    <>
      <Row class="items-end py-4 justify-around">
        <SelectLayout setLayout={setLayout} layout={layout} />
        <NavigatePages currentPage={store.currentPage} onNext={nextPage} onPrev={prevPage} />
      </Row>
      <Screen {...layout()}>
        <For each={store.currentPageElements}>
          {(element) => {
            const onClick = () =>
              selectHaspElement({
                id: element.id,
                page: element.page,
              });

            switch (element.obj) {
              case "btn":
                return <ScreenButton {...element} onClick={onClick} />;
              case "label":
                return <ScreenLabel {...element} onClick={onClick} />;
              case "obj":
                return <ScreenBasicObj {...element} onClick={onClick} />;
              case "switch":
                return <ScreenSwitch {...element} onClick={onClick} />;
              case "bar":
                return <ScreenProgressBar {...element} onClick={onClick} />;
            }
          }}
        </For>
      </Screen>
    </>
  );
}
