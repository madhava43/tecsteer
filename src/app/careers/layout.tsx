import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Tecsteer team. Browse open positions in engineering, design, and consulting.",
  openGraph: {
    title: "Careers | Tecsteer",
    description: "Join the Tecsteer team. Browse open positions in engineering, design, and consulting.",
    url: "https://tecsteer.com/careers",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function CareersLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
