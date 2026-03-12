"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Experience, Education, Project, Award, Certification, Camp, Language } from "@/lib/types";
import {
  DEFAULT_EXPERIENCES,
  DEFAULT_EDUCATION,
  DEFAULT_PROJECTS,
  DEFAULT_AWARDS,
  DEFAULT_CERTIFICATIONS,
  DEFAULT_CAMPS,
  DEFAULT_LANGUAGES,
} from "@/lib/defaults";

type ResumeData = {
  experiences: (Experience & { id: string })[];
  education: (Education & { id: string })[];
  projects: (Project & { id: string })[];
  awards: (Award & { id: string })[];
  certifications: (Certification & { id: string })[];
  camps: (Camp & { id: string })[];
  languages: (Language & { id: string })[];
};

type ResumeContextType = ResumeData & {
  loading: boolean;
  refetch: () => Promise<void>;
  // Experience
  createExperience: (item: Experience) => Promise<void>;
  updateExperience: (id: string, item: Experience) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  // Education
  createEducation: (item: Education) => Promise<void>;
  updateEducation: (id: string, item: Education) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;
  // Projects
  createProject: (item: Project) => Promise<void>;
  updateProject: (id: string, item: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  // Awards
  createAward: (item: Award) => Promise<void>;
  updateAward: (id: string, item: Award) => Promise<void>;
  deleteAward: (id: string) => Promise<void>;
  // Certifications
  createCertification: (item: Certification) => Promise<void>;
  updateCertification: (id: string, item: Certification) => Promise<void>;
  deleteCertification: (id: string) => Promise<void>;
  // Camps
  createCamp: (item: Camp) => Promise<void>;
  updateCamp: (id: string, item: Camp) => Promise<void>;
  deleteCamp: (id: string) => Promise<void>;
  // Languages
  createLanguage: (item: Language) => Promise<void>;
  updateLanguage: (id: string, item: Language) => Promise<void>;
  deleteLanguage: (id: string) => Promise<void>;
  isSupabase: boolean;
};

const defaultData: ResumeData = {
  experiences: DEFAULT_EXPERIENCES.map((e, i) => ({ ...e, id: `static-exp-${i}` })),
  education: DEFAULT_EDUCATION.map((e, i) => ({ ...e, id: `static-edu-${i}` })),
  projects: DEFAULT_PROJECTS.map((p, i) => ({ ...p, id: `static-proj-${i}` })),
  awards: DEFAULT_AWARDS.map((a, i) => ({ ...a, id: `static-award-${i}` })),
  certifications: DEFAULT_CERTIFICATIONS.map((c, i) => ({ ...c, id: `static-cert-${i}` })),
  camps: DEFAULT_CAMPS.map((c, i) => ({ ...c, id: `static-camp-${i}` })),
  languages: DEFAULT_LANGUAGES.map((l, i) => ({ ...l, id: `static-lang-${i}` })),
};

const noop = async () => {};

const ResumeContext = createContext<ResumeContextType>({
  ...defaultData,
  loading: false,
  refetch: async () => {},
  createExperience: noop,
  updateExperience: noop,
  deleteExperience: noop,
  createEducation: noop,
  updateEducation: noop,
  deleteEducation: noop,
  createProject: noop,
  updateProject: noop,
  deleteProject: noop,
  createAward: noop,
  updateAward: noop,
  deleteAward: noop,
  createCertification: noop,
  updateCertification: noop,
  deleteCertification: noop,
  createCamp: noop,
  updateCamp: noop,
  deleteCamp: noop,
  createLanguage: noop,
  updateLanguage: noop,
  deleteLanguage: noop,
  isSupabase: false,
});

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ResumeData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [isSupabase, setIsSupabase] = useState(false);
  const supabase = createClient();

  const fetchAll = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [exp, edu, proj, awd, cert, camp, lang] = await Promise.all([
        supabase.from("experiences").select("*").order("sort_order", { ascending: true }),
        supabase.from("education").select("*").order("sort_order", { ascending: true }),
        supabase.from("projects").select("*").order("sort_order", { ascending: true }),
        supabase.from("awards").select("*").order("sort_order", { ascending: true }),
        supabase.from("certifications").select("*").order("sort_order", { ascending: true }),
        supabase.from("camps").select("*").order("sort_order", { ascending: true }),
        supabase.from("languages").select("*").order("sort_order", { ascending: true }),
      ]);

      const mapProj = (r: Record<string, unknown>) => ({
        id: r.id as string,
        title: r.title as string,
        date: (r.date as string) ?? null,
        subtitle: (r.subtitle as string) ?? null,
        desc: (r.desc as string) ?? "",
        img: (r.img as string) ?? "",
        link: (r.link as string) ?? null,
        cta: (r.cta as string) ?? null,
        ctaHref: (r.cta_href as string) ?? (r.ctaHref as string) ?? null,
      });

      const certList = cert.data ?? [];
      const certificationsMapped = certList.length > 0
        ? certList.map((r) => ({ id: r.id, title: r.title, meta: r.meta, img: r.img, alt: r.alt, skills: r.skills }))
        : DEFAULT_CERTIFICATIONS.map((c, idx) => ({ ...c, id: `default-cert-${idx}` }));

      setData({
        experiences: (exp.data ?? []).map((r) => ({ id: r.id, title: r.title, meta: r.meta, body: r.body })),
        education: (edu.data ?? []).map((r) => ({ id: r.id, title: r.title, meta: r.meta, body: r.body })),
        projects: (proj.data ?? []).map((r) => mapProj(r)),
        awards: (awd.data ?? []).map((r) => ({ id: r.id, title: r.title, sub: r.sub, img: r.img, alt: r.alt })),
        certifications: certificationsMapped,
        camps: (camp.data ?? []).map((r) => ({ id: r.id, title: r.title, meta: r.meta, body: r.body, img: r.img, alt: r.alt, flip: r.flip })),
        languages: (lang.data ?? []).map((r) => ({ id: r.id, name: r.name, level: r.level, fill: r.fill })),
      });
      setIsSupabase(!!supabase);
    } catch {
      setData(defaultData);
      setIsSupabase(false);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const getNextSort = (arr: { sort_order?: number }[]) => {
    const max = Math.max(0, ...arr.map((x) => x.sort_order ?? 0));
    return max + 1;
  };

  const createExperience = useCallback(
    async (item: Experience) => {
      if (!supabase) return;
      await supabase.from("experiences").insert({ title: item.title, meta: item.meta, body: item.body, sort_order: getNextSort(data.experiences) });
      await fetchAll();
    },
    [supabase, data.experiences, fetchAll]
  );
  const updateExperience = useCallback(
    async (id: string, item: Experience) => {
      if (!supabase) return;
      await supabase.from("experiences").update({ title: item.title, meta: item.meta, body: item.body }).eq("id", id);
      await fetchAll();
    },
    [supabase, fetchAll]
  );
  const deleteExperience = useCallback(
    async (id: string) => {
      if (!supabase) return;
      await supabase.from("experiences").delete().eq("id", id);
      await fetchAll();
    },
    [supabase, fetchAll]
  );

  const createEducation = useCallback(
    async (item: Education) => {
      if (!supabase) return;
      await supabase.from("education").insert({ title: item.title, meta: item.meta, body: item.body, sort_order: getNextSort(data.education) });
      await fetchAll();
    },
    [supabase, data.education, fetchAll]
  );
  const updateEducation = useCallback(
    async (id: string, item: Education) => {
      if (!supabase) return;
      await supabase.from("education").update({ title: item.title, meta: item.meta, body: item.body }).eq("id", id);
      await fetchAll();
    },
    [supabase, fetchAll]
  );
  const deleteEducation = useCallback(
    async (id: string) => {
      if (!supabase) return;
      await supabase.from("education").delete().eq("id", id);
      await fetchAll();
    },
    [supabase, fetchAll]
  );

  const createProject = useCallback(
    async (item: Project) => {
      if (!supabase) return;
      await supabase.from("projects").insert({
        title: item.title,
        date: item.date,
        subtitle: item.subtitle,
        desc: item.desc,
        img: item.img,
        link: item.link,
        cta: item.cta,
        cta_href: item.ctaHref,
        sort_order: getNextSort(data.projects),
      });
      await fetchAll();
    },
    [supabase, data.projects, fetchAll]
  );
  const updateProject = useCallback(
    async (id: string, item: Project) => {
      if (!supabase) return;
      await supabase.from("projects").update({
        title: item.title,
        date: item.date,
        subtitle: item.subtitle,
        desc: item.desc,
        img: item.img,
        link: item.link,
        cta: item.cta,
        cta_href: item.ctaHref,
      }).eq("id", id);
      await fetchAll();
    },
    [supabase, fetchAll]
  );
  const deleteProject = useCallback(
    async (id: string) => {
      if (!supabase) return;
      await supabase.from("projects").delete().eq("id", id);
      await fetchAll();
    },
    [supabase, fetchAll]
  );

  const createAward = useCallback(
    async (item: Award) => {
      if (!supabase) return;
      await supabase.from("awards").insert({ title: item.title, sub: item.sub, img: item.img, alt: item.alt, sort_order: getNextSort(data.awards) });
      await fetchAll();
    },
    [supabase, data.awards, fetchAll]
  );
  const updateAward = useCallback(
    async (id: string, item: Award) => {
      if (!supabase) return;
      await supabase.from("awards").update({ title: item.title, sub: item.sub, img: item.img, alt: item.alt }).eq("id", id);
      await fetchAll();
    },
    [supabase, fetchAll]
  );
  const deleteAward = useCallback(
    async (id: string) => {
      if (!supabase) return;
      await supabase.from("awards").delete().eq("id", id);
      await fetchAll();
    },
    [supabase, fetchAll]
  );

  const createCertification = useCallback(
    async (item: Certification) => {
      if (!supabase) return;
      await supabase.from("certifications").insert({ title: item.title, meta: item.meta, img: item.img, alt: item.alt, skills: item.skills, sort_order: getNextSort(data.certifications) });
      await fetchAll();
    },
    [supabase, data.certifications, fetchAll]
  );
  const updateCertification = useCallback(
    async (id: string, item: Certification) => {
      if (!supabase) return;
      await supabase.from("certifications").update({ title: item.title, meta: item.meta, img: item.img, alt: item.alt, skills: item.skills }).eq("id", id);
      await fetchAll();
    },
    [supabase, fetchAll]
  );
  const deleteCertification = useCallback(
    async (id: string) => {
      if (!supabase) return;
      await supabase.from("certifications").delete().eq("id", id);
      await fetchAll();
    },
    [supabase, fetchAll]
  );

  const createCamp = useCallback(
    async (item: Camp) => {
      if (!supabase) return;
      await supabase.from("camps").insert({ title: item.title, meta: item.meta, body: item.body, img: item.img, alt: item.alt, flip: item.flip, sort_order: getNextSort(data.camps) });
      await fetchAll();
    },
    [supabase, data.camps, fetchAll]
  );
  const updateCamp = useCallback(
    async (id: string, item: Camp) => {
      if (!supabase) return;
      await supabase.from("camps").update({ title: item.title, meta: item.meta, body: item.body, img: item.img, alt: item.alt, flip: item.flip }).eq("id", id);
      await fetchAll();
    },
    [supabase, fetchAll]
  );
  const deleteCamp = useCallback(
    async (id: string) => {
      if (!supabase) return;
      await supabase.from("camps").delete().eq("id", id);
      await fetchAll();
    },
    [supabase, fetchAll]
  );

  const createLanguage = useCallback(
    async (item: Language) => {
      if (!supabase) return;
      await supabase.from("languages").insert({ name: item.name, level: item.level, fill: item.fill, sort_order: getNextSort(data.languages) });
      await fetchAll();
    },
    [supabase, data.languages, fetchAll]
  );
  const updateLanguage = useCallback(
    async (id: string, item: Language) => {
      if (!supabase) return;
      await supabase.from("languages").update({ name: item.name, level: item.level, fill: item.fill }).eq("id", id);
      await fetchAll();
    },
    [supabase, fetchAll]
  );
  const deleteLanguage = useCallback(
    async (id: string) => {
      if (!supabase) return;
      await supabase.from("languages").delete().eq("id", id);
      await fetchAll();
    },
    [supabase, fetchAll]
  );

  return (
    <ResumeContext.Provider
      value={{
        ...data,
        loading,
        refetch: fetchAll,
        createExperience,
        updateExperience,
        deleteExperience,
        createEducation,
        updateEducation,
        deleteEducation,
        createProject,
        updateProject,
        deleteProject,
        createAward,
        updateAward,
        deleteAward,
        createCertification,
        updateCertification,
        deleteCertification,
        createCamp,
        updateCamp,
        deleteCamp,
        createLanguage,
        updateLanguage,
        deleteLanguage,
        isSupabase,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}
