export type IconProvider = "lucide" | "tabler" | "heroicons";

export type IconName =
  | "home"
  | "dashboard"
  | "user"
  | "users"
  | "shield"
  | "settings"
  | "file-text"
  | "menu-square"
  | "image"
  | "blocks"
  | "bell"
  | "log-out"
  | "plus"
  | "list";

export type IconReference = {
  name: IconName;
};

export type IconProps = {
  name: IconName;
  className?: string;
};
