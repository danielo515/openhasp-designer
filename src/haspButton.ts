interface HaspButton {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
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
  w,
  h,
  text,
  enabled,
  hidden,
  toggle,
  align,
  mode,
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
  };
}
