import { Component, JSX } from "solid-js";
import { setDefaultHeight, setDefaultWidth, setPadding } from "./store/settings";
import { store } from "./store/store";

interface settingsProps {
  // add props here
}

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  value: number | string;
}

const Input: Component<InputProps> = (p) => {
  return (
    <div class="form-control">
      <label class="label">
        <span class="label-text">{p.label}</span>
      </label>
      <input type={p.type} class="input input-bordered input-sm" {...p} />
    </div>
  );
};

export const Settings: Component<settingsProps> = (p) => {
  return (
    <div class="grid grid-rows-2 gap-4 grid-flow-col">
      <Input
        label="Default width"
        type="number"
        value={store.settings.defaultWidth}
        onChange={(e) => setDefaultWidth(e.currentTarget.valueAsNumber)}
      />
      <Input
        label="Default height"
        type="number"
        value={store.settings.defaultHeight}
        onChange={(e) => setDefaultHeight(e.currentTarget.valueAsNumber)}
      />
      <Input
        label="Padding"
        type="number"
        value={store.settings.padding}
        onChange={(e) => setPadding(e.currentTarget.valueAsNumber)}
      />
    </div>
  );
};
