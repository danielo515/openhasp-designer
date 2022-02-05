import { Component, ComponentProps } from "solid-js";

interface ButtonsBottomProps extends ComponentProps<any> {
  // add props here
}

export const ButtonsBottom: Component<ButtonsBottomProps> = (
  p: ButtonsBottomProps
) => {
  return <div class="justify-end space-x-2 card-actions">{p.children}</div>;
};
