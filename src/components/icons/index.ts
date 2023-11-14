import { ComponentProps } from "react";
export interface IconProps extends ComponentProps<"svg"> {
  size?: number;
  width?: number;
  height?: number;
}

import GoogleIcon from "./google";
import MaterialIcon from "./material-icon";

export { GoogleIcon, MaterialIcon };
