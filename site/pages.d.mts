export interface Page {
  path: string;
  title: string;
  description: string;
  body: string;
  dateModified: string;
  faq?: { question: string; answer: string }[];
  noindex?: boolean;
}
export const pages: Page[];
export function header(path: string): string;
export function footer(path?: string): string;
