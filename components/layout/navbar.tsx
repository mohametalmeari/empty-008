"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { name: "Features", href: "/features" },
  { name: "About", href: "/about" },
  { name: "Docs", href: "/docs" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/30 dark:border-gray-700/30 fixed w-full z-50 top-0 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-2 rounded-md transition-colors hover:bg-amber-50/50 dark:hover:bg-amber-900/10 group"
              aria-label="Return to homepage"
            >
              <Image
                src="/logo.svg"
                alt="SolCrafter Logo"
                width={40}
                height={40}
                className="group-hover:scale-[1.02] transition-transform hidden sm:block"
              />
              <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent text-lg sm:text-2xl font-bold tracking-tight group-hover:scale-[1.02] transition-transform">
                <span className="bg-gradient-to-r from-purple-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent font-bold text-base sm:text-2xl">
                  SOL
                </span>
                Crafter
              </span>
            </Link>
            <div className="hidden md:block ml-4 sm:ml-10">
              <div className="flex items-center space-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 relative group",
                      pathname === item.href
                        ? "text-amber-600 bg-amber-50/50 dark:bg-amber-900/10"
                        : "text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400"
                    )}
                  >
                    {item.name}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-0.5 bg-amber-600 transition-all duration-200",
                        pathname === item.href
                          ? "w-full opacity-100"
                          : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                      )}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-2 sm:gap-4">
              <Button
                asChild
                className="border-2 border-amber-600 hover:border-amber-700 bg-transparent hover:bg-amber-50/50 dark:hover:bg-amber-900/10 text-amber-600 hover:text-amber-700 shadow-md hover:shadow-amber-200/20 transition-all duration-300 px-4 sm:px-6 rounded-full font-medium text-xs sm:text-base"
              >
                <Link href="/#create-token">Create Token</Link>
              </Button>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[220px] sm:w-[300px] p-0 bg-white/95 backdrop-blur-xl dark:bg-gray-900/95">
                <SheetHeader className="p-4 sm:p-6 border-b border-gray-200/30 dark:border-gray-700/30">
                  <SheetTitle>
                    <Link href="/" className="group">
                      <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent text-lg sm:text-2xl font-bold tracking-tight group-hover:scale-[1.02] transition-transform inline-block">
                        SolCrafter
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="px-4 sm:px-6">
                  <div className="space-y-1 py-4 sm:py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "block w-full text-left rounded-lg px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200",
                          pathname === item.href
                            ? "text-amber-600 bg-amber-50/50 dark:bg-amber-900/10"
                            : "text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50/30 dark:hover:bg-amber-900/20"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-4 sm:py-6 border-t border-gray-200/30 dark:border-gray-700/30">
                    <Button
                      asChild
                      className="w-full border-2 border-amber-600 hover:border-amber-700 bg-transparent hover:bg-amber-50/50 dark:hover:bg-amber-900/10 text-amber-600 hover:text-amber-700 shadow-md hover:shadow-amber-200/20 transition-all duration-300 font-medium rounded-full text-sm sm:text-base"
                    >
                      <Link href="/#create-token">Create Token</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
