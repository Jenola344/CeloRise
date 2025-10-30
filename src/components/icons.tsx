import type { SVGProps } from "react";

export function CeloRiseLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c-2 0-3-1-3-3V8a3 3 0 0 1 3-3c1.5 0 3 .5 3 3v5" />
      <path d="M12 11c0-2-1-3-3-3" />
      <path d="M18 11c0-2-1-3-3-3" />
    </svg>
  );
}
