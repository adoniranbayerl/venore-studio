"use client";

import {
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type SidebarInjectedProps = {
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
};

type SiteHeaderInjectedProps = {
  isScrolled?: boolean;
  onOpenMobileSidebar?: () => void;
  onOpenMobileContext?: () => void;
  hasContextSidebar?: boolean;
};

type AppShellProps = {
  siteHeader?: ReactNode;
  pageHeader?: ReactNode;
  sidebar?: ReactNode;
  sidebarContext?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  defaultSidebarCollapsed?: boolean;
};

export function AppShell({
  siteHeader,
  pageHeader,
  sidebar,
  sidebarContext,
  footer,
  children,
  className,
  contentClassName,
  defaultSidebarCollapsed = false,
}: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    defaultSidebarCollapsed,
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileContextOpen, setMobileContextOpen] = useState(false);
  const [isDesktopSidebar, setIsDesktopSidebar] = useState(false);
  const [isDesktopContext, setIsDesktopContext] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0);
    }

    function handleResize() {
      setIsDesktopSidebar(window.innerWidth >= 1024); // lg
      setIsDesktopContext(window.innerWidth >= 1280); // xl
    }

    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const headerHeight = isScrolled ? 56 : 80;
  const sidebarTop = headerHeight;
  const sidebarHeight = `calc(100vh - ${headerHeight}px)`;

  const sidebarWidth = sidebar ? (sidebarCollapsed ? 80 : 288) : 0;
  const contextWidth = sidebarContext ? 256 : 0;

  const appliedSidebarWidth = isDesktopSidebar ? sidebarWidth : 0;
  const appliedContextWidth = isDesktopContext ? contextWidth : 0;

  const sidebarWidthClass = useMemo(
    () => (sidebarCollapsed ? "w-20" : "w-72"),
    [sidebarCollapsed],
  );

  const resolvedSidebar = isValidElement(sidebar)
    ? cloneElement(sidebar as ReactElement<SidebarInjectedProps>, {
        collapsed: sidebarCollapsed,
        onToggleCollapsed: () => setSidebarCollapsed((prev) => !prev),
      })
    : sidebar;

  const resolvedSiteHeader = isValidElement(siteHeader)
    ? cloneElement(siteHeader as ReactElement<SiteHeaderInjectedProps>, {
        isScrolled,
        onOpenMobileSidebar: sidebar
          ? () => setMobileSidebarOpen(true)
          : undefined,
        onOpenMobileContext: sidebarContext
          ? () => setMobileContextOpen(true)
          : undefined,
        hasContextSidebar: Boolean(sidebarContext),
      })
    : siteHeader;

  const sharedPanelStyle: CSSProperties = {
    top: `${sidebarTop}px`,
    height: sidebarHeight,
    bottom: 0,
  };

  return (
    <div
      className={cn(
        "min-h-screen overflow-x-hidden bg-background text-foreground",
        className,
      )}
    >
      {resolvedSiteHeader}

      {sidebar ? (
        <>
          <div
            className={cn(
              "fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden",
              mobileSidebarOpen
                ? "opacity-100"
                : "pointer-events-none opacity-0",
            )}
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside
            className={cn(
              "fixed left-0 z-50 w-[85vw] max-w-72 border-r border-border/60 bg-background transition-transform duration-300 ease-in-out lg:hidden",
              mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
            )}
            style={sharedPanelStyle}
          >
            <div className="min-h-0 h-full flex-1">{resolvedSidebar}</div>
          </aside>
        </>
      ) : null}

      {sidebarContext ? (
        <>
          <div
            className={cn(
              "fixed inset-0 z-40 bg-black/40 transition-opacity xl:hidden",
              mobileContextOpen
                ? "opacity-100"
                : "pointer-events-none opacity-0",
            )}
            onClick={() => setMobileContextOpen(false)}
          />
          <aside
            className={cn(
              "fixed right-0 z-50 w-[85vw] max-w-72 border-l border-border/60 bg-background transition-transform duration-300 ease-in-out xl:hidden",
              mobileContextOpen ? "translate-x-0" : "translate-x-full",
            )}
            style={sharedPanelStyle}
          >
            <div className="min-h-0 h-full flex-1">{sidebarContext}</div>
          </aside>
        </>
      ) : null}

      <div
        className="relative flex overflow-x-hidden transition-[min-height] duration-300 ease-in-out"
        style={{
          minHeight: `calc(100vh - ${headerHeight}px)`,
        }}
      >
        {resolvedSidebar ? (
          <aside
            className={cn(
              "fixed left-0 z-30 hidden border-r border-border/60 bg-background shadow-[1px_0_0_rgba(255,255,255,0.02)] transition-[width,top,height] duration-300 ease-in-out lg:flex lg:flex-col",
              sidebarWidthClass,
            )}
            style={{
              top: `${sidebarTop}px`,
              height: sidebarHeight,
            }}
          >
            <div className="min-h-0 flex-1">{resolvedSidebar}</div>
          </aside>
        ) : null}

        {sidebarContext ? (
          <aside
            className="fixed right-0 z-20 hidden w-64 border-l border-border/60 bg-background shadow-[-1px_0_0_rgba(255,255,255,0.02)] transition-[top,height] duration-300 ease-in-out xl:flex xl:flex-col"
            style={{
              top: `${sidebarTop}px`,
              height: sidebarHeight,
            }}
          >
            {sidebarContext}
          </aside>
        ) : null}

        <div
          className="min-w-0 flex-1 overflow-x-hidden transition-[margin,min-height] duration-300 ease-in-out"
          style={{
            marginLeft: appliedSidebarWidth,
            marginRight: appliedContextWidth,
            minHeight: `calc(100vh - ${headerHeight}px)`,
          }}
        >
          <div className="flex min-h-full flex-col">
            {pageHeader}

            <div
              className={cn("flex min-h-0 flex-1 flex-col", contentClassName)}
            >
              {children}
            </div>

            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}
