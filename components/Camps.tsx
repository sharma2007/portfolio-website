"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useResume } from "@/context/ResumeContext";
import { useAuth } from "@/context/AuthContext";
import type { Camp } from "@/lib/types";
import AdminButtons from "./AdminButtons";
import Modal from "./Modal";

export default function Camps() {
  const { isAdmin } = useAuth();
  const { camps, createCamp, updateCamp, deleteCamp, isSupabase } = useResume();
  const [modal, setModal] = useState<{ open: boolean; item: (Camp & { id: string }) | null }>({ open: false, item: null });
  const canEdit = isAdmin && isSupabase;

  return (
    <motion.section
      id="camps"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-24 scroll-mt-24"
    >
      <div className="flex items-center justify-between gap-4 mb-12">
        <h2 className="font-sans font-semibold text-3xl sm:text-4xl text-dark tracking-tight">Camps</h2>
        {canEdit && (
          <button type="button" onClick={() => setModal({ open: true, item: null })} className="text-sm px-3 py-1.5 rounded bg-accent text-white hover:bg-accentDark">
            + Add
          </button>
        )}
      </div>
      <div className="space-y-16">
        {camps.map((camp, i) => (
          <motion.div
            key={camp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`grid md:grid-cols-2 gap-10 items-center relative group ${camp.flip ? "md:flex-row-reverse" : ""}`}
          >
            {canEdit && (
              <div className="absolute top-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <AdminButtons
                  onEdit={() => setModal({ open: true, item: camp })}
                  onDelete={() => window.confirm("Delete this camp?") && deleteCamp(camp.id)}
                />
              </div>
            )}
            <div className={camp.flip ? "md:order-2" : ""}>
              <h3 className="text-2xl font-semibold text-dark mb-2">{camp.title}</h3>
              <p className="text-muted mb-4">{camp.meta}</p>
              <p className="text-slate-700 leading-relaxed">{camp.body}</p>
            </div>
            <div className={`rounded-2xl overflow-hidden shadow-md ${camp.flip ? "md:order-1" : ""}`}>
              <div className="relative w-full h-64">
                <Image src={camp.img} alt={camp.alt} fill className="object-cover" unoptimized />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={modal.open} onClose={() => setModal({ open: false, item: null })} title={modal.item ? "Edit camp" : "Add camp"}>
        <CampForm
          item={modal.item}
          onSave={async (c) => {
            if (modal.item) await updateCamp(modal.item.id, c);
            else await createCamp(c);
            setModal({ open: false, item: null });
          }}
          onCancel={() => setModal({ open: false, item: null })}
        />
      </Modal>
    </motion.section>
  );
}

function CampForm({ item, onSave, onCancel }: { item: (Camp & { id: string }) | null; onSave: (c: Camp) => Promise<void>; onCancel: () => void }) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [meta, setMeta] = useState(item?.meta ?? "");
  const [body, setBody] = useState(item?.body ?? "");
  const [img, setImg] = useState(item?.img ?? "");
  const [alt, setAlt] = useState(item?.alt ?? "");
  const [flip, setFlip] = useState(item?.flip ?? false);
  const [saving, setSaving] = useState(false);
  return (
    <form onSubmit={async (e) => { e.preventDefault(); setSaving(true); await onSave({ title, meta, body, img, alt, flip }); setSaving(false); }} className="space-y-4">
      <div><label className="block text-sm font-medium text-slate-700 mb-1">Title</label><input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 border rounded-lg" /></div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1">Meta (dates / location)</label><input value={meta} onChange={(e) => setMeta(e.target.value)} className="w-full px-3 py-2 border rounded-lg" /></div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1">Description</label><textarea value={body} onChange={(e) => setBody(e.target.value)} required rows={4} className="w-full px-3 py-2 border rounded-lg" /></div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label><input value={img} onChange={(e) => setImg(e.target.value)} className="w-full px-3 py-2 border rounded-lg" /></div>
      <div><label className="block text-sm font-medium text-slate-700 mb-1">Alt text</label><input value={alt} onChange={(e) => setAlt(e.target.value)} className="w-full px-3 py-2 border rounded-lg" /></div>
      <div className="flex items-center gap-2"><input type="checkbox" id="flip" checked={flip} onChange={(e) => setFlip(e.target.checked)} /><label htmlFor="flip">Flip layout (image on left)</label></div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50">Cancel</button>
        <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accentDark disabled:opacity-50">{saving ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}
