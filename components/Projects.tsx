"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useResume } from "@/context/ResumeContext";
import { useAuth } from "@/context/AuthContext";
import type { Project } from "@/lib/types";
import AdminButtons from "./AdminButtons";
import Modal from "./Modal";
import SectionHeading from "./SectionHeading";
import { IconArrowUpRight } from "./Icons";
import { isLocalImage } from "@/lib/images";

export default function Projects() {
  const { isAdmin } = useAuth();
  const { projects, loading, createProject, updateProject, deleteProject, isSupabase } = useResume();
  const [modal, setModal] = useState<{ open: boolean; item: (Project & { id: string }) | null }>({ open: false, item: null });
  const canEdit = isAdmin && isSupabase;

  const [featured, ...rest] = projects;

  return (
    <motion.section id="projects" className="mb-28 scroll-mt-24">
      <SectionHeading
        index="03 / SELECTED WORK"
        title="Projects"
        subtitle="Technology and creativity in action — from lattice cryptography to wearable safety systems."
        action={
          canEdit ? (
            <button type="button" onClick={() => setModal({ open: true, item: null })} className="shrink-0 text-sm px-3 py-1.5 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors">
              + Add
            </button>
          ) : undefined
        }
      />

      {loading && projects.length === 0 ? (
        <div className="grid gap-6">
          <div className="skeleton h-80 rounded-3xl" />
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="skeleton h-64 rounded-2xl" />
            <div className="skeleton h-64 rounded-2xl" />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {featured && (
            <FeaturedProject proj={featured} canEdit={canEdit} onEdit={() => setModal({ open: true, item: featured })} onDelete={() => window.confirm("Delete this project?") && deleteProject(featured.id)} />
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {rest.map((proj, i) => (
              <ProjectCard key={proj.id} proj={proj} index={i} canEdit={canEdit} onEdit={() => setModal({ open: true, item: proj })} onDelete={() => window.confirm("Delete this project?") && deleteProject(proj.id)} />
            ))}
          </div>
        </div>
      )}

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

function ProjectLinks({ proj }: { proj: Project & { id: string } }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
      {proj.link && (
        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all">
          Visit site <IconArrowUpRight />
        </a>
      )}
      {proj.cta && proj.ctaHref && (
        <a href={proj.ctaHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-text hover:text-accent transition-colors">
          {proj.cta} <IconArrowUpRight />
        </a>
      )}
    </div>
  );
}

function FeaturedProject({ proj, canEdit, onEdit, onDelete }: { proj: Project & { id: string }; canEdit: boolean; onEdit: () => void; onDelete: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="group relative grid md:grid-cols-2 rounded-3xl overflow-hidden border border-line bg-surface shadow-card"
    >
      {canEdit && (
        <div className="absolute top-3 right-3 z-20"><AdminButtons onEdit={onEdit} onDelete={onDelete} /></div>
      )}
      <div className="relative min-h-[240px] md:min-h-[380px] overflow-hidden">
        <Image src={proj.img} alt={proj.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" unoptimized={!isLocalImage(proj.img)} />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface/95 via-surface/20 to-transparent" />
        <span className="absolute top-4 left-4 chip rounded-full px-2.5 py-1">FEATURED</span>
      </div>
      <div className="p-7 sm:p-9 flex flex-col justify-center">
        {proj.date && <p className="font-mono text-xs text-accent mb-3">{proj.date}</p>}
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-text leading-tight">
          {proj.link ? (
            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{proj.title}</a>
          ) : proj.title}
        </h3>
        {proj.subtitle && <p className="text-accent/90 text-sm mt-1.5 font-medium">{proj.subtitle}</p>}
        <p className="text-muted leading-relaxed mt-4">{proj.desc}</p>
        <ProjectLinks proj={proj} />
      </div>
    </motion.article>
  );
}

function ProjectCard({ proj, index, canEdit, onEdit, onDelete }: { proj: Project & { id: string }; index: number; canEdit: boolean; onEdit: () => void; onDelete: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.05, duration: 0.45 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 shadow-card"
    >
      {canEdit && (
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity"><AdminButtons onEdit={onEdit} onDelete={onDelete} /></div>
      )}
      <div className="relative h-48 overflow-hidden">
        <Image src={proj.img} alt={proj.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw" unoptimized={!isLocalImage(proj.img)} />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/70 to-transparent" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        {proj.date && <p className="font-mono text-xs text-accent mb-2">{proj.date}</p>}
        <h3 className="font-display font-semibold text-xl text-text leading-tight">
          {proj.link ? (
            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{proj.title}</a>
          ) : proj.title}
        </h3>
        {proj.subtitle && <p className="text-accent/90 text-sm mt-1 font-medium">{proj.subtitle}</p>}
        <p className="text-muted text-sm leading-relaxed mt-3 flex-1">{proj.desc}</p>
        <ProjectLinks proj={proj} />
      </div>
    </motion.article>
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
      <div><label className="block text-sm font-medium text-text mb-1">Title</label><input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-text" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">Date</label><input value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-text" placeholder="e.g. November 2023 – Jan 2025" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">Subtitle (optional)</label><input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-text" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">Description</label><textarea value={desc} onChange={(e) => setDesc(e.target.value)} required rows={3} className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-text" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">Image URL</label><input value={img} onChange={(e) => setImg(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-text" placeholder="/images/projects/..." /></div>
      <div><label className="block text-sm font-medium text-text mb-1">Project link (optional)</label><input value={link} onChange={(e) => setLink(e.target.value)} type="url" className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-text" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">CTA label (e.g. Website)</label><input value={cta} onChange={(e) => setCta(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-text" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">CTA URL</label><input value={ctaHref} onChange={(e) => setCtaHref(e.target.value)} type="url" className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-text" /></div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-line text-text hover:bg-white/5 transition-colors">Cancel</button>
        <button type="submit" disabled={saving} className="btn-primary px-4 py-2 rounded-lg font-medium disabled:opacity-50">{saving ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}
