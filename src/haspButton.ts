interface CommonHaspProps {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
  page: number;
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
  y = 0,
  w = 100,
  h = 100,
  text = "Button",
  enabled,
  hidden,
  toggle,
  align,
  mode,
  page,
}: Partial<HaspButton>): HaspButton {
  return {
    id,
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
    page,
  };
}
