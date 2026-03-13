"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useResume } from "@/context/ResumeContext";
import { useAuth } from "@/context/AuthContext";
import type { Project } from "@/lib/types";
import AdminButtons from "./AdminButtons";
import Modal from "./Modal";
import { IconArrowRight } from "./Icons";

function getBentoClass(i: number) {
  if (i === 0) return "md:col-span-2 md:row-span-2 min-h-[280px]";
  if (i === 1) return "md:col-span-1 min-h-[220px]";
  if (i === 2) return "md:col-span-1 min-h-[220px]";
  return "md:col-span-1 min-h-[200px]";
}

export default function Projects() {
  const { isAdmin } = useAuth();
  const { projects, createProject, updateProject, deleteProject, isSupabase } = useResume();
  const [modal, setModal] = useState<{ open: boolean; item: (Project & { id: string }) | null }>({ open: false, item: null });
  const canEdit = isAdmin && isSupabase;

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-24 scroll-mt-24"
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-text tracking-tight">Projects</h2>
        {canEdit && (
          <button type="button" onClick={() => setModal({ open: true, item: null })} className="text-sm px-3 py-1.5 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-all duration-300">
            + Add
          </button>
        )}
      </div>
      <p className="text-muted text-lg mb-12">Technology and creativity in action.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:auto-rows-[220px]">
        {projects.map((proj, i) => (
          <motion.article
            key={proj.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-surface ${getBentoClass(i)} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 hover:border-accent/20`}
          >
            <div className="absolute inset-0">
              <Image src={proj.img} alt={proj.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" unoptimized />
              {/* Strong gradient so text is readable on any image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
            </div>
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              {canEdit && (
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <AdminButtons
                    onEdit={() => setModal({ open: true, item: proj })}
                    onDelete={() => window.confirm("Delete this project?") && deleteProject(proj.id)}
                  />
                </div>
              )}
              <span className="text-accent text-xs font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{proj.date}</span>
              <h3 className="font-display font-semibold text-lg text-white mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                {proj.link ? (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300">
                    {proj.title}
                  </a>
                ) : (
                  proj.title
                )}
              </h3>
              {proj.subtitle && <p className="text-white/90 text-sm mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{proj.subtitle}</p>}
              <p className="text-white/85 text-sm mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{proj.desc}</p>
              {proj.cta && proj.ctaHref && (
                <a
                  href={proj.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent font-medium text-sm mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:gap-2"
                >
                  {proj.cta} <IconArrowRight />
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      <Modal open={modal.open} onClose={() => setModal({ open: false, item: null })} title={modal.item ? "Edit project" : "Add project"}>
        <ProjectForm
          item={modal.item}
          onSave={async (p) => {
            if (modal.item) await updateProject(modal.item.id, p);
            else await createProject(p);
            setModal({ open: false, item: null });
          }}
          onCancel={() => setModal({ open: false, item: null })}
        />
      </Modal>
    </motion.section>
  );
}

function ProjectForm({
  item,
  onSave,
  onCancel,
}: {
  item: (Project & { id: string }) | null;
  onSave: (p: Project) => Promise<void>;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [date, setDate] = useState(item?.date ?? "");
  const [subtitle, setSubtitle] = useState(item?.subtitle ?? "");
  const [desc, setDesc] = useState(item?.desc ?? "");
  const [img, setImg] = useState(item?.img ?? "");
  const [link, setLink] = useState(item?.link ?? "");
  const [cta, setCta] = useState(item?.cta ?? "");
  const [ctaHref, setCtaHref] = useState(item?.ctaHref ?? "");
  const [saving, setSaving] = useState(false);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        await onSave({
          title,
          date: date || null,
          subtitle: subtitle || null,
          desc,
          img: img || "/images/projects/placeholder.avif",
          link: link || null,
          cta: cta || null,
          ctaHref: ctaHref || null,
        });
        setSaving(false);
      }}
      className="space-y-4"
    >
      <div><label className="block text-sm font-medium text-text mb-1">Title</label><input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">Date</label><input value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" placeholder="e.g. November 2023 – Jan 2025" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">Subtitle (optional)</label><input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">Description</label><textarea value={desc} onChange={(e) => setDesc(e.target.value)} required rows={3} className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">Image URL</label><input value={img} onChange={(e) => setImg(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" placeholder="/images/projects/..." /></div>
      <div><label className="block text-sm font-medium text-text mb-1">Project link (optional)</label><input value={link} onChange={(e) => setLink(e.target.value)} type="url" className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">CTA label (e.g. Website)</label><input value={cta} onChange={(e) => setCta(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">CTA URL</label><input value={ctaHref} onChange={(e) => setCtaHref(e.target.value)} type="url" className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" /></div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-white/20 text-text hover:bg-white/5 transition-all duration-300">Cancel</button>
        <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-accent text-bg hover:bg-accent/90 disabled:opacity-50 transition-all duration-300">{saving ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}
