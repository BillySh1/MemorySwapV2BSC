import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 36 36" fill="#007BE4" >
      <rect x="6" y="6" width="24" height="24" rx="12" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
      <rect x="1" y="1" width="34" height="34" rx="17" stroke="white" strokeWidth="2" />
    </Svg>
  );
};

export default Icon;
