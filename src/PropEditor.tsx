import { Component, For, Show } from "solid-js";
import { setStore, store } from "./store";

interface PropEditorProps {
  // add props here
}

const NumberInput = (p) => {
  return <input class="input input-sm" type="number" {...p} />;
};
const TextInput = (p) => {
  return <input class="input input-sm" type="text" {...p} />;
};

const ColorInput = (p) => {
  return <input class="input input-sm" type="color" {...p} />;
};

const BaseComponents = [
  { label: "Text", component: TextInput, prop: "text" },
  { label: "Position x", component: NumberInput, prop: "x" },
  { label: "Position y", component: NumberInput, prop: "y" },
  { label: "Height", component: NumberInput, prop: "h" },
  { label: "Width", component: NumberInput, prop: "w" },
  { label: "Radius", component: NumberInput, prop: "radius" },
  { label: "Border width", component: NumberInput, prop: "border_width" },
  { label: "Border color", component: ColorInput, prop: "border_color" },
] as const;

export const PropEditor: Component<PropEditorProps> = (p) => {
  return (
    <Show when={store.currentElement}>
      <div>
        <For each={BaseComponents}>
          {({ component: Component, prop, label }) => (
            <>
              <div class="flex space-x-2 items-center justify-between">
                <label class="label font-thin">{label}</label>
                <Component
                  value={store.currentElement[prop]}
                  onChange={(e) =>
                    setStore(
                      "pages",
                      store.currentElement.index,
                      prop,
                      e.currentTarget.value
                    )
                  }
                />
              </div>
              <div class="divider" />
            </>
          )}
        </For>
      </div>
    </Show>
  );
};
