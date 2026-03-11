"use client";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ResumeProvider } from "@/context/ResumeContext";
import AdminBar from "./AdminBar";

function AdminSpacer() {
  const { user, isAdmin } = useAuth();
  if (!user || !isAdmin) return null;
  return <div className="h-10 flex-shrink-0" aria-hidden />;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ResumeProvider>
        <AdminBar />
        <AdminSpacer />
        {children}
      </ResumeProvider>
    </AuthProvider>
  );
}
