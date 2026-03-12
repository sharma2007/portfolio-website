"use client";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ResumeProvider } from "@/context/ResumeContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AdminBar from "./AdminBar";
import CustomCursor from "./CustomCursor";

function AdminSpacer() {
  const { user, isAdmin } = useAuth();
  if (!user || !isAdmin) return null;
  return <div className="h-10 flex-shrink-0" aria-hidden />;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ResumeProvider>
        <AdminBar />
        <AdminSpacer />
        <CustomCursor />
        {children}
        </ResumeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
