import { DEFAULT_ICON_PROVIDER } from "./config";
import { lucideIcons } from "./providers/lucide";
import type { IconProps } from "./types";

export function Icon({ name, className }: IconProps) {
  const provider = DEFAULT_ICON_PROVIDER;

  const registry = provider === "lucide" ? lucideIcons : lucideIcons;

  const Component = registry[name];

  if (!Component) {
    return null;
  }

  return <Component className={className} />;
}
