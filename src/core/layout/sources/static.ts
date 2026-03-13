import type { LayoutContext, LayoutDefinition } from "../types";

const layoutDefinitions: Record<LayoutContext, LayoutDefinition> = {
  public: {
    title: "Venore",
    showHeader: false,
    showFooter: false,
    showSidebar: false,
    showContextSidebar: false,
  },
  auth: {
    title: "Autenticação",
    showHeader: false,
    showFooter: false,
    showSidebar: false,
    showContextSidebar: false,
  },
  private: {
    title: "Portal",
    showHeader: true,
    showFooter: true,
    showSidebar: true,
    showContextSidebar: true,
  },
  admin: {
    title: "Admin",
    showHeader: true,
    showFooter: true,
    showSidebar: true,
    showContextSidebar: true,
  },
};

export function getStaticLayoutDefinition(
  context: LayoutContext,
): LayoutDefinition {
  return layoutDefinitions[context];
}
