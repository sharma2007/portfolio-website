"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useResume } from "@/context/ResumeContext";
import { useAuth } from "@/context/AuthContext";
import type { Award } from "@/lib/types";
import AdminButtons from "./AdminButtons";
import Modal from "./Modal";

export default function Awards() {
  const { isAdmin } = useAuth();
  const { awards, createAward, updateAward, deleteAward, isSupabase } = useResume();
  const [modal, setModal] = useState<{ open: boolean; item: (Award & { id: string }) | null }>({ open: false, item: null });
  const canEdit = isAdmin && isSupabase;

  return (
    <motion.section
      id="awards"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-24 scroll-mt-24"
    >
      <div className="flex items-center justify-between gap-4 mb-12">
        <h2 className="font-sans font-semibold text-3xl sm:text-4xl text-dark tracking-tight">Awards</h2>
        {canEdit && (
          <button type="button" onClick={() => setModal({ open: true, item: null })} className="text-sm px-3 py-1.5 rounded bg-accent text-white hover:bg-accentDark">
            + Add
          </button>
        )}
      </div>
      <div className="grid sm:grid-cols-2 gap-8">
        {awards.map((award, i) => (
          <motion.div
            key={award.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow relative group"
          >
            {canEdit && (
              <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <AdminButtons
                  onEdit={() => setModal({ open: true, item: award })}
                  onDelete={() => window.confirm("Delete this award?") && deleteAward(award.id)}
                />
              </div>
            )}
            <div className="aspect-[4/3] bg-slate-100 relative">
              <Image src={award.img} alt={award.alt} fill className="object-cover" unoptimized />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-dark">{award.title}</h3>
              <p className="text-muted mt-1">{award.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={modal.open} onClose={() => setModal({ open: false, item: null })} title={modal.item ? "Edit award" : "Add award"}>
        <AwardForm
          item={modal.item}
          onSave={async (a) => {
            if (modal.item) await updateAward(modal.item.id, a);
            else await createAward(a);
            setModal({ open: false, item: null });
          }}
          onCancel={() => setModal({ open: false, item: null })}
        />
      </Modal>
    </motion.section>
  );
}

function AwardForm({ item, onSave, onCancel }: { item: (Award & { id: string }) | null; onSave: (a: Award) => Promise<void>; onCancel: () => void }) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [sub, setSub] = useState(item?.sub ?? "");
  const [img, setImg] = useState(item?.img ?? "");
  const [alt, setAlt] = useState(item?.alt ?? "");
  const [saving, setSaving] = useState(false);
  return (
    <form onSubmit={async (e) => { e.preventDefault(); setSaving(true); await onSave({ title, sub, img, alt }); setSaving(false); }} className="space-y-4">
      <div><label className="block text-sm font-medium text-slate-700 mb-1">Title</label><input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 border rounded-lg" /></div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1">Subtitle / description</label><input value={sub} onChange={(e) => setSub(e.target.value)} className="w-full px-3 py-2 border rounded-lg" /></div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label><input value={img} onChange={(e) => setImg(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="/images/awards/..." /></div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1">Alt text</label><input value={alt} onChange={(e) => setAlt(e.target.value)} className="w-full px-3 py-2 border rounded-lg" /></div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50">Cancel</button>
        <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accentDark disabled:opacity-50">{saving ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}
