import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/next";

const SITE_URL = "https://sohamsharma.info";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const title = "Soham Sharma — Portfolio | CS Student, Conrad Innovator";
const description =
  "Official portfolio of Soham Sharma: Computer Science student at HKUST, Conrad Innovator, FLL UAE Runner Up. Projects, awards, experience, and contact.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Soham Sharma",
  },
  description,
  keywords: [
    "Soham Sharma",
    "Soham Sharma portfolio",
    "Soham Sharma HKUST",
    "Soham Sharma Dubai",
    "Soham Sharma developer",
    "Soham Sharma Conrad",
    "Soham Sharma FLL",
  ],
  authors: [{ name: "Soham Sharma", url: SITE_URL }],
  creator: "Soham Sharma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Soham Sharma",
    title,
    description,
    images: [
      {
        url: `${SITE_URL}/images/user.avif`,
        width: 512,
        height: 512,
        alt: "Soham Sharma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}/images/user.avif`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/images/favicon/favicon.ico", sizes: "any" },
      { url: "/images/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/images/favicon/apple-touch-icon.png",
  },
  manifest: "/images/favicon/site.webmanifest",
  verification: {
    // Add when you have them: google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Soham Sharma",
  url: SITE_URL,
  image: `${SITE_URL}/images/user.avif`,
  jobTitle: "Computer Science Student",
  worksFor: {
    "@type": "Organization",
    name: "The Hong Kong University of Science and Technology",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "The Hong Kong University of Science and Technology" },
    { "@type": "School", name: "Dubai International Academy" },
  ],
  description,
  sameAs: [
    "https://linkedin.com/in/ssharma25",
    "https://github.com/sharma2007",
  ],
  knowsAbout: ["Computer Science", "Software Development", "Lattice Cryptography", "Robotics", "AI"],
  award: ["Conrad Innovator", "FLL UAE Runner Up", "National IOI Qualifier UAE Rank 3", "Purple Math Comet UAE No. 1"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`} data-theme="dark" suppressHydrationWarning>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
