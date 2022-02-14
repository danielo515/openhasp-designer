import { Button } from "./components/Button";

export function CreateControls({ createElement }) {
  return (
    <div class="grid sm:grid-cols-5 sm:gap-1 grid-cols-2 gap-2 ">
      <Button
        label="Button"
        variant="default"
        size="md"
        onClick={() => {
          createElement({
            text: "Button",
            obj: "btn",
          });
        }}
      />
      <Button
        label="Label"
        size="md"
        variant="default"
        onClick={() => {
          createElement({
            text: "Label",
            obj: "label",
          });
        }}
      />
      <Button
        label="Switch"
        size="md"
        variant="default"
        onClick={() => {
          createElement({
            obj: "switch",
          });
        }}
      />
      <Button
        label="Basic"
        variant="default"
        size="md"
        onClick={() => {
          createElement({
            obj: "obj",
          });
        }}
      />
      <Button
        label="Progress"
        variant="default"
        size="md"
        onClick={() => {
          createElement({
            obj: "bar",
          });
        }}
      />
    </div>
  );
}
