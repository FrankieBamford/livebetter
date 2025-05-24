import React from "react";

export function Sterling(props: React.SVGProps<SVGSVGElement>) {
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
      className=" text-[#1fbe32]"
    >
      <path d="M18 7c0-1.7-1.3-3-3-3h-4c-2 0-3 1.5-3 3m0 0c0 1 .6 2 2 2h.5" />
      <path d="M11 12H7" />
      <path d="M14 17c-1.9.1-3.8-.4-5-1.5" />
      <path d="M7 17h10" />
    </svg>
  );
}

export default Sterling;
