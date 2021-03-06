import { Component, For, Show } from "solid-js";
import { mapNameToColor } from "./mapColors";
import { setStore, store } from "./store/store";

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
  return (
    <input
      class="input input-sm"
      type="color"
      {...p}
      value={mapNameToColor(p.value) ?? "#000000"}
    />
  );
};

const BaseComponents = [
  // { label: "Text", component: TextInput, prop: "text" },
  { label: "Position x", component: NumberInput, prop: "x" },
  { label: "Position y", component: NumberInput, prop: "y" },
  { label: "Height", component: NumberInput, prop: "h" },
  { label: "Width", component: NumberInput, prop: "w" },
  { label: "Radius", component: NumberInput, prop: "radius" },
  { label: "Border width", component: NumberInput, prop: "border_width" },
  { label: "Border color", component: ColorInput, prop: "border_color" },
  { label: "Text color", component: ColorInput, prop: "text_color" },
  { label: "Background color", component: ColorInput, prop: "bg_color" },
] as const;

const Nothing: Component = () => {
  return (
    <div class="h-full w-full flex items-center justify-center text-2xl bg-base-200">
      <h1>No element selected</h1>
    </div>
  );
};

const Row: Component<{ label: string }> = (p) => {
  return (
    <div class="flex space-x-2 items-center justify-between">
      <label class="label font-thin">{p.label}</label>
      {p.children}
    </div>
  );
};

export const PropEditor: Component<PropEditorProps> = (p) => {
  return (
    <Show when={store.currentElement} fallback={<Nothing />}>
      {(current) => (
        <>
          <div class="p-4 bg-base-200">ID: {current.id} </div>
          <div class="p-4 overflow-y-auto flex-1">
            <For each={BaseComponents}>
              {({ component: Component, prop, label }) => (
                <>
                  <Row label={label}>
                    <Component
                      value={current[prop]}
                      onChange={(e) =>
                        setStore("pages", current.index, prop, e.currentTarget.value)
                      }
                    />
                  </Row>
                  <div class="divider" />
                </>
              )}
            </For>
            <Show when={current.obj === "btn"}>
              <Row label="Text">
                <TextInput
                  //@ts-expect-error I don't know how to properly narrow this down
                  value={current.text}
                  onChange={(e) => setStore("pages", current.index, "text", e.currentTarget.value)}
                />
              </Row>
            </Show>
          </div>
        </>
      )}
    </Show>
  );
};
