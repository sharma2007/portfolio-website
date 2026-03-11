"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function AdminBar() {
  const { user, loading, signOut, isAdmin } = useAuth();

  if (loading || !user || !isAdmin) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-slate-800 text-white px-4 py-2 flex items-center justify-between text-sm shadow-lg">
      <span className="font-medium">Edit mode</span>
      <div className="flex items-center gap-4">
        <Link href="/" className="hover:text-accent transition-colors">View site</Link>
        <button type="button" onClick={() => signOut()} className="hover:text-accent transition-colors">
          Log out
        </button>
      </div>
    </div>
  );
}
