export type Experience = { id?: string; title: string; meta: string; body: string; sort_order?: number };
export type Education = { id?: string; title: string; meta: string; body: string; sort_order?: number };
export type Project = {
  id?: string;
  title: string;
  date: string | null;
  subtitle: string | null;
  desc: string;
  img: string;
  link: string | null;
  cta: string | null;
  ctaHref: string | null;
  sort_order?: number;
};
export type Award = { id?: string; title: string; sub: string; img: string; alt: string; sort_order?: number };
export type Certification = {
  id?: string;
  title: string;
  meta: string;
  img: string | null;
  alt: string;
  skills: string | null;
  sort_order?: number;
};
export type Camp = {
  id?: string;
  title: string;
  meta: string;
  body: string;
  img: string;
  alt: string;
  flip: boolean;
  sort_order?: number;
};
export type Language = { id?: string; name: string; level: string; fill: number; sort_order?: number };
