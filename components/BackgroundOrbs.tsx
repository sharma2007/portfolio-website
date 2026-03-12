"use client";

export default function BackgroundOrbs() {
  return (
    <>
      <div
        className="fixed left-0 top-0 w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none -z-10"
        style={{ animation: "orb-drift-1 20s ease-in-out infinite" }}
        aria-hidden
      />
      <div
        className="fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[100px] pointer-events-none -z-10"
        style={{ animation: "orb-drift-2 25s ease-in-out infinite" }}
        aria-hidden
      />
    </>
  );
}
