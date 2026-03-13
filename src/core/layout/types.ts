export type LayoutPageMeta = {
  title?: string;
  metadata?: string;
};

export type LayoutPageMetaResolver = {
  pattern: RegExp;
  meta: LayoutPageMeta;
};
