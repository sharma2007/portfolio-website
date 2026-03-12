"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useResume } from "@/context/ResumeContext";
import { useAuth } from "@/context/AuthContext";
import type { Experience, Education } from "@/lib/types";
import AdminButtons from "./AdminButtons";
import Modal from "./Modal";

export default function Resume() {
  const { user, isAdmin } = useAuth();
  const {
    experiences,
    education,
    createExperience,
    updateExperience,
    deleteExperience,
    createEducation,
    updateEducation,
    deleteEducation,
    isSupabase,
  } = useResume();

  const [expModal, setExpModal] = useState<{ open: boolean; item: (Experience & { id: string }) | null }>({ open: false, item: null });
  const [eduModal, setEduModal] = useState<{ open: boolean; item: (Education & { id: string }) | null }>({ open: false, item: null });

  const canEdit = isAdmin && isSupabase;

  return (
    <motion.section
      id="resume"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-24 scroll-mt-24"
    >
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-text mb-12 tracking-tight">
        Resume
      </h2>

      {/* Experience — vertical timeline */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">Experience</h3>
        {canEdit && (
          <button
            type="button"
            onClick={() => setExpModal({ open: true, item: null })}
            className="text-sm px-3 py-1.5 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-all duration-300"
          >
            + Add
          </button>
        )}
      </div>

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-px" />
        {experiences.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`relative flex md:justify-end mb-8 pl-14 md:pl-0 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-2 md:left-1/2 w-4 h-4 rounded-full bg-accent -translate-x-1/2 z-10 ring-4 ring-bg" />
              <div
                className={`flex-1 md:max-w-[calc(50%-2rem)] md:w-[calc(50%-2rem)] ${
                  isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                }`}
              >
                <div className="relative group rounded-xl border border-white/10 bg-surface p-6 hover:border-accent/30 transition-all duration-300 cta-glow">
                  {canEdit && (
                    <div className={`absolute top-3 opacity-0 group-hover:opacity-100 transition-opacity ${isLeft ? "left-3 md:right-3 md:left-auto" : "right-3"}`}>
                      <AdminButtons
                        onEdit={() => setExpModal({ open: true, item })}
                        onDelete={() => window.confirm("Delete this experience?") && deleteExperience(item.id)}
                      />
                    </div>
                  )}
                  <h4 className="font-display font-semibold text-lg text-text pr-20 md:pr-0">{item.title}</h4>
                  <p className="text-muted text-sm mt-1">{item.meta}</p>
                  <p className="mt-3 text-muted text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
              <div className="hidden md:block flex-1 max-w-[calc(50%-2rem)]" />
            </motion.div>
          );
        })}
      </div>

      {/* Education — same timeline */}
      <div className="flex items-center justify-between gap-4 mb-8 mt-16">
        <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">Education</h3>
        {canEdit && (
          <button
            type="button"
            onClick={() => setEduModal({ open: true, item: null })}
            className="text-sm px-3 py-1.5 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-all duration-300"
          >
            + Add
          </button>
        )}
      </div>

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-px" />
        {education.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`relative flex md:justify-end mb-8 pl-14 md:pl-0 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-2 md:left-1/2 w-4 h-4 rounded-full bg-accent -translate-x-1/2 z-10 ring-4 ring-bg" />
              <div
                className={`flex-1 md:max-w-[calc(50%-2rem)] md:w-[calc(50%-2rem)] ${
                  isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                }`}
              >
                <div className="relative group rounded-xl border border-white/10 bg-surface p-6 hover:border-accent/30 transition-all duration-300 cta-glow">
                  {canEdit && (
                    <div className={`absolute top-3 opacity-0 group-hover:opacity-100 transition-opacity ${isLeft ? "left-3 md:right-3 md:left-auto" : "right-3"}`}>
                      <AdminButtons
                        onEdit={() => setEduModal({ open: true, item })}
                        onDelete={() => window.confirm("Delete this education entry?") && deleteEducation(item.id)}
                      />
                    </div>
                  )}
                  <h4 className="font-display font-semibold text-lg text-text pr-20 md:pr-0">{item.title}</h4>
                  <p className="text-muted text-sm mt-1">{item.meta}</p>
                  <p className="mt-3 text-muted text-sm">{item.body}</p>
                </div>
              </div>
              <div className="hidden md:block flex-1 max-w-[calc(50%-2rem)]" />
            </motion.div>
          );
        })}
      </div>

      <Modal open={expModal.open} onClose={() => setExpModal({ open: false, item: null })} title={expModal.item ? "Edit experience" : "Add experience"}>
        <ExpForm
          item={expModal.item}
          onSave={async (e) => {
            if (expModal.item) await updateExperience(expModal.item.id, e);
            else await createExperience(e);
            setExpModal({ open: false, item: null });
          }}
          onCancel={() => setExpModal({ open: false, item: null })}
        />
      </Modal>
      <Modal open={eduModal.open} onClose={() => setEduModal({ open: false, item: null })} title={eduModal.item ? "Edit education" : "Add education"}>
        <EduForm
          item={eduModal.item}
          onSave={async (e) => {
            if (eduModal.item) await updateEducation(eduModal.item.id, e);
            else await createEducation(e);
            setEduModal({ open: false, item: null });
          }}
          onCancel={() => setEduModal({ open: false, item: null })}
        />
      </Modal>
    </motion.section>
  );
}

function ExpForm({
  item,
  onSave,
  onCancel,
}: {
  item: (Experience & { id: string }) | null;
  onSave: (e: Experience) => Promise<void>;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [meta, setMeta] = useState(item?.meta ?? "");
  const [body, setBody] = useState(item?.body ?? "");
  const [saving, setSaving] = useState(false);
  return (
    <form onSubmit={async (e) => { e.preventDefault(); setSaving(true); await onSave({ title, meta, body }); setSaving(false); }} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text mb-1">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" />
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1">Meta (e.g. dates · company)</label>
        <input value={meta} onChange={(e) => setMeta(e.target.value)} required className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" />
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1">Description</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} required rows={4} className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-white/20 text-text hover:bg-white/5 transition-all duration-300">Cancel</button>
        <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-accent text-bg hover:bg-accent/90 disabled:opacity-50 transition-all duration-300">{saving ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}

function EduForm({
  item,
  onSave,
  onCancel,
}: {
  item: (Education & { id: string }) | null;
  onSave: (e: Education) => Promise<void>;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [meta, setMeta] = useState(item?.meta ?? "");
  const [body, setBody] = useState(item?.body ?? "");
  const [saving, setSaving] = useState(false);
  return (
    <form onSubmit={async (e) => { e.preventDefault(); setSaving(true); await onSave({ title, meta, body }); setSaving(false); }} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text mb-1">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" />
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1">Meta (e.g. dates · school)</label>
        <input value={meta} onChange={(e) => setMeta(e.target.value)} required className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" />
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1">Description</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} required rows={4} className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-white/20 text-text hover:bg-white/5 transition-all duration-300">Cancel</button>
        <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-accent text-bg hover:bg-accent/90 disabled:opacity-50 transition-all duration-300">{saving ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}
