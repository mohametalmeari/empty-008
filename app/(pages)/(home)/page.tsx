"use client";

import Image from "next/image";
import { TokenForm } from "@/components/token-form";
import { useBalance } from "@/hooks/use-balance";
import { TokenFormProvider } from "@/providers/token-form";
import { WalletModalButton } from "@solana/wallet-adapter-react-ui";
import { FaRocket } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { CombinedButton } from "@/components/ui/combined-button";
import { WalletIcon } from "lucide-react";
import { FEE_AMOUNT } from "@/lib/solana-utils";

export default function Home() {
  const { publicKey } = useBalance();

  return (
    <TokenFormProvider>
      <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-8">
        <div className="relative space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-2">
          {publicKey ? (
            <TokenForm />
          ) : (
            <div className="flex flex-col items-center gap-12 p-8">
              <div className="flex flex-col items-center gap-8 text-center max-w-[800px]">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-shine"></div>
                  <Image
                    src="/logo.svg"
                    alt="SOLCrafter Logo"
                    width={120}
                    height={120}
                    className="transform hover:scale-110 transition-all duration-700 relative"
                    priority
                  />
                </div>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h1 className="text-5xl sm:text-6xl font-bold text-amber-600 drop-shadow-lg tracking-tight transition-all duration-300 cursor-default">
                      Create Token on{" "}
                      <span className="bg-gradient-to-r from-purple-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent transition-all duration-300 hover:from-purple-500 hover:via-cyan-500 hover:to-emerald-500">
                        Solana
                      </span>
                    </h1>
                  </div>
                  <p className="text-lg sm:text-xl text-amber-800/90 max-w-[600px] leading-relaxed">
                    Get full authority and ownership of your token. Our platform
                    handles the complexity while you focus on your vision.
                  </p>
                </div>
              </div>
              <div className="relative group animate-pulse-delayed">
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-shine scale-90" />
                <CombinedButton
                  FunctionalityButton={WalletModalButton}
                  className="relative px-10 py-6 bg-gradient-to-r from-amber-600 to-yellow-600 backdrop-blur hover:from-amber-500 hover:to-yellow-500 rounded-lg text-lg font-medium border border-yellow-300/20 group-hover:border-yellow-200/30 transition-all duration-500 text-white group-hover:text-white hover:scale-110 shadow-lg shadow-amber-500/20 hover:shadow-amber-400/40 animate-shine-fast cursor-pointer"
                >
                  Select Wallet
                  <WalletIcon />
                </CombinedButton>
              </div>

              <p className="text-sm font-bold uppercase bg-gradient-to-r from-purple-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent text-center animate-pulse transition-all duration-700">
                FULL AUTHORITY FOR ONLY {FEE_AMOUNT} SOL
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center max-w-5xl">
                {[
                  {
                    icon: <FaRocket className="w-8 h-8" />,
                    title: "Lightning Fast",
                    text: "Solana processes 65,000 transactions per second with 400ms block times.",
                    gradient: "from-yellow-400 to-amber-500",
                  },
                  {
                    icon: <IoShieldCheckmark className="w-8 h-8" />,
                    title: "Ultra Secure",
                    text: "Benefit from Solana's proof-of-stake and proof-of-history security.",
                    gradient: "from-amber-500 to-yellow-500",
                  },
                  {
                    icon: <RiMoneyDollarCircleLine className="w-8 h-8" />,
                    title: "Cost Effective",
                    text: "Average transaction cost of $0.00025, making token operations affordable.",
                    gradient: "from-yellow-500 to-amber-400",
                  },
                ].map(({ icon, title, text, gradient }, i) => (
                  <div
                    key={i}
                    className="group relative animate-in fade-in slide-in-from-bottom duration-700"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <div className="absolute -inset-px bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                    <div className="relative flex flex-col items-center gap-4 p-6 rounded-xl bg-white/80 hover:bg-white/90 backdrop-blur-sm border border-yellow-200 group-hover:border-yellow-300 transition-all duration-500 hover:scale-105">
                      <div
                        className={`bg-gradient-to-br ${gradient} p-4 rounded-xl text-white shadow-lg transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-bounce-shine`}
                      >
                        {icon}
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-medium bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent group-hover:from-amber-800 group-hover:to-amber-950 transition-all duration-500">
                          {title}
                        </h3>
                        <p className="text-sm text-amber-800/90 leading-relaxed group-hover:text-amber-900">
                          {text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </TokenFormProvider>
  );
}
