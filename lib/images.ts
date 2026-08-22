/**
 * Local images (bundled under /public) can be safely optimized by next/image.
 * Remote/admin-supplied URLs are passed through unoptimized so an arbitrary
 * host never breaks the image pipeline (and never needs remotePatterns config).
 */
export function isLocalImage(src: string | null | undefined): boolean {
  return typeof src === "string" && src.startsWith("/");
}
