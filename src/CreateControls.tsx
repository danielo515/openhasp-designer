import { Button } from "./components/Button";

export function CreateControls({ createElement }) {
  return (
    <>
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
    </>
  );
}
