import { ComponentProps } from "solid-js";

const verticalLayout = { height: 400, width: 300, tag: "vertical" } as const;
const horizontalLayout = {
  height: 300,
  width: 400,
  tag: "horizontal",
} as const;

export type Layout = typeof verticalLayout | typeof horizontalLayout;

export type HaspScreenOrientation = "horizontal" | "vertical";

export const getScreenDimensions = (layout: HaspScreenOrientation): Layout => {
  if (layout === "horizontal") {
    return horizontalLayout;
  }

  return verticalLayout;
};

interface Props extends ComponentProps<"div"> {
  width: number;
  height: number;
}

export function Screen(props: Props) {
  const style = () => `height: ${props.height}px; width: ${props.width}px;`;
  return (
    <div
      class="bg-gray-500 rounded border-cyan-600 border-2 relative shadow-md"
      style={style()}
    >
      {props.children}
    </div>
  );
}
