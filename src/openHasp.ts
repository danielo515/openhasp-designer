import { SetOptional } from "type-fest";

export interface CommonHaspProps {
  id: number;
  page: number;
  x: number;
  y: number;
  /** width  */
  w: number;
  /** height  */
  h: number;
  /** border radius  */
  radius?: number;
  border_width?: number;
  border_color?: string;
  hidden?: boolean;
  bg_color?: string;
  bg_grad_color?: string;
  border_side?: number;
  text_color?: string;
}

type align = "left" | "center" | "right";
type mode = "expand" | "break" | "dots" | "scroll" | "loop" | "crop";
export interface HaspButton extends CommonHaspProps {
  obj: "btn";
  text: string;
  enabled?: boolean;
  toggle?: boolean;
  align: align;
  mode: mode;
}

export interface HaspLabel extends CommonHaspProps {
  align: align;
  mode: mode;
  text: string;
  obj: "label";
}

function createBasicObject({
  id,
  x,
  y,
  w,
  h,
  radius,
  page,
  border_width,
  border_color,
  hidden = false,
}: CommonHaspProps): CommonHaspProps {
  return {
    id,
    x,
    y,
    w,
    h,
    page,
    radius,
    border_width,
    border_color,
    hidden,
  };
}

export function createButton({
  enabled,
  toggle,
  text = "Button",
  align = "left",
  mode = "crop",
  ...base
}: Omit<HaspButton, "obj">): HaspButton {
  return {
    ...createBasicObject(base),
    text,
    enabled,
    toggle,
    obj: "btn",
    align,
    mode,
  };
}

type LabelInput = Omit<SetOptional<HaspLabel, "align" | "mode">, "obj">;

export function createHaspLabel(args: LabelInput): HaspLabel {
  const { text = "Label", align = "left", mode = "crop" } = args;
  return {
    ...createBasicObject(args),
    text,
    obj: "label",
    align,
    mode,
  };
}
