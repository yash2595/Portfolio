import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yash Mishra — Full Stack Developer & AI Engineer",
  description: "Portfolio of Yash Mishra, full stack developer and AI engineer: MyLAT, MantraSetu Saarthi AI, React, Node.js, MongoDB and LLM products.",
  openGraph: { title: "Yash Mishra — Full Stack Developer & AI Engineer", description: "React, Node.js, MongoDB and AI-powered products.", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
