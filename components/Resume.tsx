"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useResume } from "@/context/ResumeContext";
import { useAuth } from "@/context/AuthContext";
import type { Experience, Education } from "@/lib/types";
import AdminButtons from "./AdminButtons";
import Modal from "./Modal";

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-24 scroll-mt-24"
    >
      <h2 className="font-sans font-semibold text-3xl sm:text-4xl text-dark mb-12 tracking-tight">Resume</h2>

      <div className="flex items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-semibold text-muted uppercase tracking-wider">Experience</h3>
        {canEdit && (
          <button
            type="button"
            onClick={() => setExpModal({ open: true, item: null })}
            className="text-sm px-3 py-1.5 rounded bg-accent text-white hover:bg-accentDark"
          >
            + Add
          </button>
        )}
      </div>
      <ul className="space-y-8 mb-16">
        {experiences.map((item, i) => (
          <motion.li
            key={item.id}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="pl-6 border-l-4 border-accent relative group"
          >
            {canEdit && (
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <AdminButtons
                  onEdit={() => setExpModal({ open: true, item })}
                  onDelete={() => window.confirm("Delete this experience?") && deleteExperience(item.id)}
                />
              </div>
            )}
            <h4 className="text-xl font-semibold text-dark">{item.title}</h4>
            <p className="text-muted text-base mt-1">{item.meta}</p>
            <p className="mt-3 text-slate-700 leading-relaxed">{item.body}</p>
          </motion.li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-semibold text-muted uppercase tracking-wider">Education</h3>
        {canEdit && (
          <button
            type="button"
            onClick={() => setEduModal({ open: true, item: null })}
            className="text-sm px-3 py-1.5 rounded bg-accent text-white hover:bg-accentDark"
          >
            + Add
          </button>
        )}
      </div>
      <ul className="space-y-8">
        {education.map((item, i) => (
          <motion.li
            key={item.id}
            custom={i + experiences.length}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="pl-6 border-l-4 border-accent relative group"
          >
            {canEdit && (
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <AdminButtons
                  onEdit={() => setEduModal({ open: true, item })}
                  onDelete={() => window.confirm("Delete this education entry?") && deleteEducation(item.id)}
                />
              </div>
            )}
            <h4 className="text-xl font-semibold text-dark">{item.title}</h4>
            <p className="text-muted text-base mt-1">{item.meta}</p>
            <p className="mt-3 text-slate-700">{item.body}</p>
          </motion.li>
        ))}
      </ul>

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
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        await onSave({ title, meta, body });
        setSaving(false);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 border rounded-lg" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Meta (e.g. dates · company)</label>
        <input value={meta} onChange={(e) => setMeta(e.target.value)} required className="w-full px-3 py-2 border rounded-lg" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} required rows={4} className="w-full px-3 py-2 border rounded-lg" />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50">Cancel</button>
        <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accentDark disabled:opacity-50">{saving ? "Saving..." : "Save"}</button>
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
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        await onSave({ title, meta, body });
        setSaving(false);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 border rounded-lg" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Meta (e.g. dates · school)</label>
        <input value={meta} onChange={(e) => setMeta(e.target.value)} required className="w-full px-3 py-2 border rounded-lg" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} required rows={4} className="w-full px-3 py-2 border rounded-lg" />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50">Cancel</button>
        <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accentDark disabled:opacity-50">{saving ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}
