/**
 * Recency ordering for resume content.
 *
 * Extracts the *end* date from a human-written string (single date or a
 * "start – end" range) and returns a comparable numeric value (year*12 + month).
 * Higher = more recent. Used to sort lists newest-first.
 *
 * - "Present" / "Current" / "Ongoing" -> +Infinity (always on top)
 * - Empty / no date -> +Infinity too, so freshly added (undated) items surface
 * - Unparseable non-empty text -> -Infinity (sinks to the bottom)
 */
const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

export function parseEndDate(input: string | null | undefined): number {
  if (!input || !input.trim()) return Number.POSITIVE_INFINITY;
  const s = input.toLowerCase();
  if (/\b(present|current|ongoing|now)\b/.test(s)) return Number.POSITIVE_INFINITY;

  let best = Number.NEGATIVE_INFINITY;

  // Month + year (e.g. "January 2025", "Jul 2023")
  const monthYear = /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(\d{4})/g;
  let m: RegExpExecArray | null;
  while ((m = monthYear.exec(s)) !== null) {
    const val = parseInt(m[2], 10) * 12 + MONTHS[m[1].slice(0, 3)];
    if (val > best) best = val;
  }

  // Fallback: standalone years (e.g. "2021")
  if (best === Number.NEGATIVE_INFINITY) {
    const yearOnly = /\b(19|20)\d{2}\b/g;
    let y: RegExpExecArray | null;
    while ((y = yearOnly.exec(s)) !== null) {
      const val = parseInt(y[0], 10) * 12 + 11; // assume year-end for range comparisons
      if (val > best) best = val;
    }
  }

  return best;
}

/** Stable sort a list newest-first by the end date extracted from `getDate`. */
export function sortByRecency<T>(arr: T[], getDate: (item: T) => string | null | undefined): T[] {
  return [...arr]
    .map((item, i) => ({ item, i }))
    .sort((a, b) => {
      const diff = parseEndDate(getDate(b.item)) - parseEndDate(getDate(a.item));
      return diff !== 0 ? diff : a.i - b.i; // keep input order on ties
    })
    .map(({ item }) => item);
}
