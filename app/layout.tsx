import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SolCrafter - Create Solana Tokens",
  description: "Create your own Solana token easily with SolCrafter. Fast, secure, and customizable token deployment platform.",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      }
    ],
    shortcut: ["/favicon.svg"],
    apple: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full relative`}
      >
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-amber-500/20 to-yellow-700/20 animate-gradient-slow" />
          <div className="absolute inset-0 bg-gradient-to-tl from-amber-600/20 via-yellow-600/20 to-amber-700/20 animate-gradient-slow-reverse" />
        </div>

        <div className="fixed inset-0 -z-10 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full blur-3xl opacity-30 animate-float-slow"
              style={{
                background: i === 0 
                  ? "linear-gradient(to right, rgba(234, 179, 8, 0.5), rgba(202, 138, 4, 0.5))"
                  : i === 1
                  ? "linear-gradient(to right, rgba(202, 138, 4, 0.5), rgba(180, 146, 46, 0.5))"
                  : "linear-gradient(to right, rgba(180, 146, 46, 0.5), rgba(234, 179, 8, 0.5))",
                width: `${(i + 1) * 256}px`,
                height: `${(i + 1) * 256}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`
              }}
            />
          ))}
        </div>

        <div
          className="fixed inset-0 -z-10 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(234, 179, 8, 0.15) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {children}
      </body>
    </html>
  );
}
