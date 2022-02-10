import { Button } from "./components/Button";

export function CreateControls({ createElement }) {
  return (
    <>
      <Button
        label="Button"
        variant="primary"
        onClick={() => {
          createElement({
            text: "Button",
            obj: "btn",
          });
        }}
      />
      <Button
        label="Label"
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
