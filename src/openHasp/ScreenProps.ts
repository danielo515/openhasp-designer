import { CommonHaspProps } from "../openHasp";

export interface ScreenProps<OBJ extends string> extends CommonHaspProps {
  obj: OBJ;
  onClick: () => void;
}
