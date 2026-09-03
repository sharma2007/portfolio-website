"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useResume } from "@/context/ResumeContext";
import { useAuth } from "@/context/AuthContext";
import type { Experience, Education } from "@/lib/types";
import AdminButtons from "./AdminButtons";
import Modal from "./Modal";
import SectionHeading from "./SectionHeading";
import { IconArrowUpRight, IconDownload } from "./Icons";

export default function Resume() {
  const { isAdmin } = useAuth();
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
    <section id="resume" className="mb-28 scroll-mt-24">
      <SectionHeading
        index="02 / TRAJECTORY"
        title="Experience"
        subtitle="Roles, leadership, and the education behind the work."
        action={
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold"
          >
            <IconDownload /> CV (PDF)
          </a>
        }
      />

      <Timeline
        items={experiences}
        canEdit={canEdit}
        onAdd={() => setExpModal({ open: true, item: null })}
        onEdit={(item) => setExpModal({ open: true, item })}
        onDelete={(id) => window.confirm("Delete this experience?") && deleteExperience(id)}
      />

      <div className="mt-16">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h3 className="kicker text-muted">Education</h3>
          {canEdit && (
            <button type="button" onClick={() => setEduModal({ open: true, item: null })} className="text-sm px-3 py-1.5 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors">+ Add</button>
          )}
        </div>
        <Timeline
          items={education}
          canEdit={canEdit}
          onAdd={() => setEduModal({ open: true, item: null })}
          onEdit={(item) => setEduModal({ open: true, item })}
          onDelete={(id) => window.confirm("Delete this education entry?") && deleteEducation(id)}
          hideAdd
        />
      </div>

      <Modal open={expModal.open} onClose={() => setExpModal({ open: false, item: null })} title={expModal.item ? "Edit experience" : "Add experience"}>
        <EntryForm
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
        <EntryForm
          item={eduModal.item}
          onSave={async (e) => {
            if (eduModal.item) await updateEducation(eduModal.item.id, e);
            else await createEducation(e);
            setEduModal({ open: false, item: null });
          }}
          onCancel={() => setEduModal({ open: false, item: null })}
        />
      </Modal>
    </section>
  );
}

type TimelineItem = (Experience | Education) & { id: string };

/** Renders a body as bullets when it has multiple lines, else a paragraph. */
function TimelineBody({ text }: { text: string }) {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim().replace(/^[-•*]\s*/, ""))
    .filter(Boolean);

  if (lines.length <= 1) {
    return <p className="mt-3 text-muted text-sm leading-relaxed">{text}</p>;
  }
  return (
    <ul className="mt-3 space-y-2">
      {lines.map((line, i) => (
        <li key={i} className="flex gap-2.5 text-muted text-sm leading-relaxed">
          <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

function Timeline({
  items,
  canEdit,
  onEdit,
  onDelete,
  hideAdd,
}: {
  items: TimelineItem[];
  canEdit: boolean;
  onAdd: () => void;
  onEdit: (item: TimelineItem) => void;
  onDelete: (id: string) => void;
  hideAdd?: boolean;
}) {
  void hideAdd;
  return (
    <div className="relative pl-8 sm:pl-10">
      <div className="absolute left-2 top-1 bottom-1 w-px -translate-x-1/2 bg-timelineLine" />
      <div className="space-y-6">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="relative group"
          >
            <span
              aria-hidden
              className="absolute -left-8 sm:-left-10 top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-bg"
            >
              <span className="block h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <div className="rounded-2xl border border-line bg-surface p-6 hover:border-accent/30 transition-colors shadow-card">
              {canEdit && (
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <AdminButtons onEdit={() => onEdit(item)} onDelete={() => onDelete(item.id)} />
                </div>
              )}
              <h4 className="font-display font-semibold text-lg text-text pr-16">{item.title}</h4>
              <p className="font-mono text-xs text-accent mt-1.5">{item.meta}</p>
              <TimelineBody text={item.body} />
              {item.cta && item.ctaHref && (
                <a
                  href={item.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all"
                >
                  {item.cta} <IconArrowUpRight />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function EntryForm({
  item,
  onSave,
  onCancel,
}: {
  item: (TimelineItem) | null;
  onSave: (e: { title: string; meta: string; body: string }) => Promise<void>;
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
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-text" />
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1">Meta (e.g. dates · organization)</label>
        <input value={meta} onChange={(e) => setMeta(e.target.value)} required className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-text" />
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1">Description <span className="text-muted font-normal">(one achievement per line = bullets)</span></label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} required rows={5} className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-text" />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-line text-text hover:bg-white/5 transition-colors">Cancel</button>
        <button type="submit" disabled={saving} className="btn-primary px-4 py-2 rounded-lg font-medium disabled:opacity-50">{saving ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}
