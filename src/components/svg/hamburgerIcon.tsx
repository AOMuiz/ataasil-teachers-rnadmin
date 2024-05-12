import * as React from "react";
import { SVGProps } from "react";

const HamburgerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={31}
    fill="none"
    {...props}
  >
    <path
      stroke="#8691A6"
      strokeLinecap="round"
      strokeWidth={2}
      d="M6.25 9.25h17.5M6.25 15.5h12.5M6.25 21.75h7.5"
    />
  </svg>
);
export default HamburgerIcon;
