"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useResume } from "@/context/ResumeContext";
import { useAuth } from "@/context/AuthContext";
import type { Project } from "@/lib/types";
import AdminButtons from "./AdminButtons";
import Modal from "./Modal";

export default function Projects() {
  const { isAdmin } = useAuth();
  const { projects, createProject, updateProject, deleteProject, isSupabase } = useResume();
  const [modal, setModal] = useState<{ open: boolean; item: (Project & { id: string }) | null }>({ open: false, item: null });
  const canEdit = isAdmin && isSupabase;

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-24 scroll-mt-24"
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="font-sans font-semibold text-3xl sm:text-4xl text-dark tracking-tight">Projects</h2>
        {canEdit && (
          <button type="button" onClick={() => setModal({ open: true, item: null })} className="text-sm px-3 py-1.5 rounded bg-accent text-white hover:bg-accentDark">
            + Add
          </button>
        )}
      </div>
      <p className="text-muted text-lg mb-12">Technology and creativity in action.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj, i) => (
          <motion.article
            key={proj.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col relative group"
          >
            {canEdit && (
              <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <AdminButtons
                  onEdit={() => setModal({ open: true, item: proj })}
                  onDelete={() => window.confirm("Delete this project?") && deleteProject(proj.id)}
                />
              </div>
            )}
            <div className="aspect-video bg-slate-100 relative">
              <Image src={proj.img} alt={proj.title} fill className="object-cover" unoptimized />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-muted text-sm">{proj.date}</span>
              <h3 className="text-xl font-semibold text-dark mt-2">
                {proj.link ? (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    {proj.title}
                  </a>
                ) : (
                  proj.title
                )}
              </h3>
              {proj.subtitle && <p className="text-slate-600 text-sm mt-1">{proj.subtitle}</p>}
              <p className="text-slate-700 mt-2 flex-1">{proj.desc}</p>
              {proj.cta && proj.ctaHref && (
                <a href={proj.ctaHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent font-medium mt-4 hover:gap-2 transition-all">
                  {proj.cta} <i className="icon-arrow-right22" />
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
      <div><label className="block text-sm font-medium text-slate-700 mb-1">Title</label><input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 border rounded-lg" /></div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1">Date</label><input value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. November 2023 – Jan 2025" /></div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1">Subtitle (optional)</label><input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg" /></div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1">Description</label><textarea value={desc} onChange={(e) => setDesc(e.target.value)} required rows={3} className="w-full px-3 py-2 border rounded-lg" /></div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label><input value={img} onChange={(e) => setImg(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="/images/projects/..." /></div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1">Project link (optional)</label><input value={link} onChange={(e) => setLink(e.target.value)} type="url" className="w-full px-3 py-2 border rounded-lg" /></div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1">CTA label (e.g. Website)</label><input value={cta} onChange={(e) => setCta(e.target.value)} className="w-full px-3 py-2 border rounded-lg" /></div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1">CTA URL</label><input value={ctaHref} onChange={(e) => setCtaHref(e.target.value)} type="url" className="w-full px-3 py-2 border rounded-lg" /></div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50">Cancel</button>
        <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accentDark disabled:opacity-50">{saving ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}
