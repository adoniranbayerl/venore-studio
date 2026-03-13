import type { ReactNode } from "react";

export type BrandProps = {
  href?: string;
  label?: string;
  logo?: ReactNode;
  logoSrc?: string;
  logoAlt?: string;
  collapsed?: boolean;
  className?: string;
  logoClassName?: string;
  labelClassName?: string;
};
