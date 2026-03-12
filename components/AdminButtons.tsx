"use client";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
};

export default function AdminButtons({ onEdit, onDelete, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={onEdit}
        className="p-1.5 rounded bg-white/10 hover:bg-accent hover:text-bg text-muted transition-all duration-300"
        aria-label="Edit"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="p-1.5 rounded bg-white/10 hover:bg-red-500 hover:text-white text-muted transition-all duration-300"
        aria-label="Delete"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
      </button>
    </div>
  );
}
