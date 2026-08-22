"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useResume } from "@/context/ResumeContext";
import { useAuth } from "@/context/AuthContext";
import type { Language } from "@/lib/types";
import AdminButtons from "./AdminButtons";
import Modal from "./Modal";
import SectionHeading from "./SectionHeading";

export default function Languages() {
  const { isAdmin } = useAuth();
  const { languages, createLanguage, updateLanguage, deleteLanguage, isSupabase } = useResume();
  const [modal, setModal] = useState<{ open: boolean; item: (Language & { id: string }) | null }>({ open: false, item: null });
  const canEdit = isAdmin && isSupabase;

  return (
    <section id="languages" className="mb-8 scroll-mt-24">
      <SectionHeading
        index="08 / LANGUAGES"
        title="Languages"
        action={
          canEdit ? (
            <button type="button" onClick={() => setModal({ open: true, item: null })} className="shrink-0 text-sm px-3 py-1.5 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors">
              + Add
            </button>
          ) : undefined
        }
      />
      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
        {languages.map((lang, i) => (
          <motion.div
            key={lang.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="bg-surface rounded-xl border border-line p-6 hover:border-accent/30 transition-colors relative group shadow-card"
          >
            {canEdit && (
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <AdminButtons
                  onEdit={() => setModal({ open: true, item: lang })}
                  onDelete={() => window.confirm("Delete this language?") && deleteLanguage(lang.id)}
                />
              </div>
            )}
            <div className="flex justify-between items-baseline mb-3">
              <span className="font-display font-semibold text-text text-lg">{lang.name}</span>
              <span className="font-mono text-xs text-accent">{lang.level}</span>
            </div>
            <div className="h-2 bg-bg rounded-full overflow-hidden border border-line">
              <motion.div
                className="h-full bg-accent rounded-full min-w-[4px]"
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.fill}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={modal.open} onClose={() => setModal({ open: false, item: null })} title={modal.item ? "Edit language" : "Add language"}>
        <LangForm
          item={modal.item}
          onSave={async (l) => {
            if (modal.item) await updateLanguage(modal.item.id, l);
            else await createLanguage(l);
            setModal({ open: false, item: null });
          }}
          onCancel={() => setModal({ open: false, item: null })}
        />
      </Modal>
    </section>
  );
}

function LangForm({ item, onSave, onCancel }: { item: (Language & { id: string }) | null; onSave: (l: Language) => Promise<void>; onCancel: () => void }) {
  const [name, setName] = useState(item?.name ?? "");
  const [level, setLevel] = useState(item?.level ?? "");
  const [fill, setFill] = useState(item?.fill ?? 50);
  const [saving, setSaving] = useState(false);
  return (
    <form onSubmit={async (e) => { e.preventDefault(); setSaving(true); await onSave({ name, level, fill }); setSaving(false); }} className="space-y-4">
      <div><label className="block text-sm font-medium text-text mb-1">Language name</label><input value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-text" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">Level (e.g. C1, A2, Mother Tongue)</label><input value={level} onChange={(e) => setLevel(e.target.value)} required className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-text" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">Progress bar fill (0–100)</label><input type="number" min={0} max={100} value={fill} onChange={(e) => setFill(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg bg-surface border border-line text-text" /></div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-line text-text hover:bg-white/5 transition-colors">Cancel</button>
        <button type="submit" disabled={saving} className="btn-primary px-4 py-2 rounded-lg font-medium disabled:opacity-50">{saving ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}
