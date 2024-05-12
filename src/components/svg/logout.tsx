import * as React from "react";
import { SVGProps } from "react";

const LogoutIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path stroke="#222" strokeWidth={2} d="M8 18.928A8 8 0 1 0 8 5.072" />
    <path
      fill="#222"
      d="m2 12-.78-.625-.5.625.5.625L2 12Zm9 1a1 1 0 1 0 0-2v2ZM5.22 6.375l-4 5 1.56 1.25 4-5-1.56-1.25Zm-4 6.25 4 5 1.56-1.25-4-5-1.56 1.25ZM2 13h9v-2H2v2Z"
    />
  </svg>
);
export default LogoutIcon;
