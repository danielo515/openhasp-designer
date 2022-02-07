import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "./constants";

interface CommonHaspProps {
  id: number;
  x: number;
  y: number;
  /** width  */
  w: number;
  /** height  */
  h: number;
  page: number;
  /** border radius  */
  radius: number;
  border_width: number;
  border_color: string;
}
export interface HaspButton extends CommonHaspProps {
  text: string;
  enabled: boolean;
  hidden: boolean;
  toggle: boolean;
  obj: "btn";
  align: "left" | "center" | "right";
  mode: "expand" | "break" | "dots" | "scroll" | "loop" | "crop";
}

export function createButton({
  id,
  x,
  y,
  w = DEFAULT_WIDTH,
  h = DEFAULT_HEIGHT,
  radius = 5,
  text = "Button",
  enabled,
  hidden,
  toggle,
  align,
  mode,
  page,
  border_width = 1,
  border_color,
}: Partial<HaspButton>): HaspButton {
  return {
    id,
    page,
    x,
    y,
    w,
    h,
    text,
    enabled,
    hidden,
    toggle,
    obj: "btn",
    align,
    mode,
    radius,
    border_width,
    border_color,
  };
}
