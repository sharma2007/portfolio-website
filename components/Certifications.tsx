"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useResume } from "@/context/ResumeContext";
import { useAuth } from "@/context/AuthContext";
import type { Certification } from "@/lib/types";
import AdminButtons from "./AdminButtons";
import Modal from "./Modal";

/** Map old cert image paths (with spaces / %20) to current filenames without spaces. */
function certImageSrc(img: string | null): string | null {
  if (!img) return null;
  if (img.includes("Learn%20Intermediate%20C++") || img.includes("Learn Intermediate C++ Course")) return "/images/certifications/Learn_Intermediate_Cpp_Course.avif";
  if (img.includes("Learn%20C++%20Course") || img.includes("Learn C++ Course.avif")) return "/images/certifications/Learn_Cpp_Course.avif";
  return img;
}

export default function Certifications() {
  const { isAdmin } = useAuth();
  const { certifications, createCertification, updateCertification, deleteCertification, isSupabase } = useResume();
  const [modal, setModal] = useState<{ open: boolean; item: (Certification & { id: string }) | null }>({ open: false, item: null });
  const canEdit = isAdmin && isSupabase;

  return (
    <motion.section
      id="certifications"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-24 scroll-mt-24"
    >
      <div className="flex items-center justify-between gap-4 mb-12">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-text tracking-tight">Certifications</h2>
        {canEdit && (
          <button type="button" onClick={() => setModal({ open: true, item: null })} className="text-sm px-3 py-1.5 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-all duration-300">
            + Add
          </button>
        )}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="bg-surface rounded-2xl overflow-hidden border border-white/10 hover:border-accent/20 transition-all duration-300 relative group"
          >
            {canEdit && (
              <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <AdminButtons
                  onEdit={() => setModal({ open: true, item: cert })}
                  onDelete={() => window.confirm("Delete this certification?") && deleteCertification(cert.id)}
                />
              </div>
            )}
            <div className="aspect-[4/3] bg-bg/50 relative">
              {certImageSrc(cert.img) ? (
                <Image src={certImageSrc(cert.img)!} alt={cert.alt} fill className="object-cover" unoptimized />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-surface to-bg text-muted p-4 text-center">
                  <span className="text-lg font-semibold text-text line-clamp-2">{cert.title}</span>
                  <span className="text-sm mt-1">{cert.meta}</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="font-display font-semibold text-lg text-text">{cert.title}</h3>
              <p className="text-accent text-sm mt-1">{cert.meta}</p>
              {cert.skills && <p className="text-muted text-sm mt-2 line-clamp-2">{cert.skills}</p>}
            </div>
          </motion.div>
        ))}
      </div>

      <Modal open={modal.open} onClose={() => setModal({ open: false, item: null })} title={modal.item ? "Edit certification" : "Add certification"}>
        <CertForm
          item={modal.item}
          onSave={async (c) => {
            if (modal.item) await updateCertification(modal.item.id, c);
            else await createCertification(c);
            setModal({ open: false, item: null });
          }}
          onCancel={() => setModal({ open: false, item: null })}
        />
      </Modal>
    </motion.section>
  );
}

function CertForm({ item, onSave, onCancel }: { item: (Certification & { id: string }) | null; onSave: (c: Certification) => Promise<void>; onCancel: () => void }) {
  const [title, setTitle] = useState(item?.title ?? "");
  const [meta, setMeta] = useState(item?.meta ?? "");
  const [img, setImg] = useState(item?.img ?? "");
  const [alt, setAlt] = useState(item?.alt ?? "");
  const [skills, setSkills] = useState(item?.skills ?? "");
  const [saving, setSaving] = useState(false);
  return (
    <form onSubmit={async (e) => { e.preventDefault(); setSaving(true); await onSave({ title, meta, img: img || null, alt, skills: skills || null }); setSaving(false); }} className="space-y-4">
      <div><label className="block text-sm font-medium text-text mb-1">Title</label><input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">Meta (e.g. Codecademy – July 2025)</label><input value={meta} onChange={(e) => setMeta(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">Image URL (optional)</label><input value={img} onChange={(e) => setImg(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">Alt text</label><input value={alt} onChange={(e) => setAlt(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" /></div>
      <div><label className="block text-sm font-medium text-text mb-1">Skills (optional)</label><textarea value={skills} onChange={(e) => setSkills(e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg bg-surface border border-white/10 text-text" /></div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-white/20 text-text hover:bg-white/5 transition-all duration-300">Cancel</button>
        <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-accent text-bg hover:bg-accent/90 disabled:opacity-50 transition-all duration-300">{saving ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}
