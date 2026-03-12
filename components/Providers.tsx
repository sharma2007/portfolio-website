"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ResumeProvider } from "@/context/ResumeContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AdminBar from "./AdminBar";
import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";
import CursorSpotlight from "./CursorSpotlight";
import BackgroundOrbs from "./BackgroundOrbs";

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
          <ScrollProgress />
          <CursorSpotlight />
          <BackgroundOrbs />
          <AdminBar />
          <AdminSpacer />
          <CustomCursor />
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </ResumeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
