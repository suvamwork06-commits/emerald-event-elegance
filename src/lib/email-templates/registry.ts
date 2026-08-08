import type { ReactElement } from "react";
import { template as newEnquiryTemplate } from "./new-enquiry";

export type TemplateEntry = {
  component: (props: Record<string, unknown>) => ReactElement;
  subject: string | ((data: Record<string, unknown>) => string);
  displayName?: string;
  previewData?: Record<string, unknown>;
  to?: string | ((data: Record<string, unknown>) => string | string[]);
};

export const TEMPLATES: Record<string, TemplateEntry> = {
  "new-enquiry": newEnquiryTemplate,
};

export type TemplateName = keyof typeof TEMPLATES;
