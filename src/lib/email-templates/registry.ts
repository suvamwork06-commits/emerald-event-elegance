import type { ReactElement } from "react";

export type TemplateEntry = {
  component: (props: Record<string, unknown>) => ReactElement;
  subject: string | ((data: Record<string, unknown>) => string);
  displayName?: string;
  previewData?: Record<string, unknown>;
  to?: string | ((data: Record<string, unknown>) => string | string[]);
};

export const TEMPLATES: Record<string, TemplateEntry> = {};

export type TemplateName = keyof typeof TEMPLATES;
