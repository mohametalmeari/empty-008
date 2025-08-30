"use client";

import Link from "next/link";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Features", href: "/features" },
    { name: "Docs", href: "/docs" },
    { name: "Terms", href: "/terms" },
    { name: "Privacy", href: "/privacy" },
  ],
  social: [
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: FaTwitter,
    },
    {
      name: "GitHub",
      href: "https://github.com",
      icon: FaGithub,
    },
    {
      name: "Discord",
      href: "https://discord.gg",
      icon: FaDiscord,
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto pt-8 sm:pt-16 pb-4 sm:pb-8 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12">
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="space-y-2 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-amber-800">
                SolCrafter
              </h3>
              <p className="text-xs sm:text-sm text-amber-800/90 leading-relaxed max-w-md">
                Building the future of Solana token creation. Fast, secure, and
                customizable token deployment platform.
              </p>
            </div>

            <div className="space-y-2 sm:space-y-4">
              <a
                href="mailto:hi@solcrafter.site"
                className="text-xs sm:text-sm text-amber-800 hover:text-amber-900 transition-colors inline-flex items-center gap-2 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 group-hover:scale-110 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                hi@solcrafter.site
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 lg:ml-auto mt-8 md:mt-0">
            <h3 className="text-base sm:text-lg font-semibold text-amber-800 mb-4 sm:mb-6">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2 sm:gap-3">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xs sm:text-sm text-amber-800 hover:text-amber-900 transition-colors inline-flex items-center gap-2 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-4 mt-8 md:mt-0">
            <h3 className="text-base sm:text-lg font-semibold text-amber-800 mb-4 sm:mb-6">
              Connect With Us
            </h3>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-xs sm:text-sm text-amber-800/90 leading-relaxed">
                Join our community to stay updated with the latest features and
                updates.
              </p>
              <div className="flex gap-2 sm:gap-4">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-amber-800 hover:text-amber-900 transition-all hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-16 pt-4 sm:pt-8 border-t border-amber-200/20">
          <p className="text-center text-xs sm:text-sm text-amber-800/75">
            &copy; {new Date().getFullYear()} SolCrafter | All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
