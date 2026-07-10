import type { SVGProps } from "react";

type IconName =
  | "phone"
  | "mail"
  | "arrow"
  | "quote"
  | "star"
  | "pin"
  | "check"
  | "menu"
  | "close"
  | "clock"
  | "map"
  | "chevron";

const paths: Record<IconName, React.ReactNode> = {
  phone: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
    />
  ),
  mail: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  ),
  arrow: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  ),
  quote: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9m0 0h4.5m-4.5 0v-3.75M18.75 8.25H17.25A2.25 2.25 0 0 0 15 10.5v9m0 0h4.5m-4.5 0v-3.75"
    />
  ),
  star: <path d="M11.48 3.5a.56.56 0 0 1 1.04 0l2.05 4.98a.56.56 0 0 0 .47.34l5.37.43c.5.04.7.66.32.99l-4.09 3.5a.56.56 0 0 0-.18.55l1.25 5.24c.12.49-.42.88-.85.62l-4.6-2.8a.56.56 0 0 0-.58 0l-4.6 2.8c-.43.26-.97-.13-.85-.62l1.25-5.24a.56.56 0 0 0-.18-.55l-4.09-3.5c-.38-.33-.18-.95.32-.99l5.37-.43a.56.56 0 0 0 .47-.34L11.48 3.5Z" />,
  pin: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    />
  ),
  check: <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />,
  menu: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />,
  close: <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />,
  clock: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  ),
  map: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 6.75 3.75 4.5v13.5L9 20.25m0-13.5 6 2.25m-6-2.25v13.5m6-11.25 5.25-2.25v13.5L15 18m0-11.25v11.25m0 0-6-2.25"
    />
  ),
  chevron: <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />,
};

const filled: IconName[] = ["star"];

export function Icon({
  name,
  className = "size-5",
  ...props
}: { name: IconName; className?: string } & SVGProps<SVGSVGElement>) {
  const isFilled = filled.includes(name);
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={1.7}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

export type { IconName };
