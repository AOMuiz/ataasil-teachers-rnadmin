import * as React from "react";
import { SVGProps } from "react";
const Flag = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" {...props}>
    <path fill="#ffce00" d="M0 320h640v160.002H0z" />
    <path d="M0 0h640v160H0z" />
    <path fill="#d00" d="M0 160h640v160H0z" />
  </svg>
);
export default Flag;
