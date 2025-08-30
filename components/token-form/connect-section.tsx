import { useBalance } from "@/hooks/use-balance";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "../ui/button";
import { useTokenForm } from "@/providers/token-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "../ui/progress";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CombinedButton } from "../ui/combined-button";
import { FEE_AMOUNT } from "@/lib/solana-utils";

export const ConnectSection = () => {
  const { balance, loading, refreshBalance } = useBalance();
  const { handleNext, skip } = useTokenForm();
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (balance) {
      const targetValue = Math.min((balance / FEE_AMOUNT) * 100, 100);
      setProgressValue(targetValue);
      if (balance >= FEE_AMOUNT) {
        skip.execute();
      }
    } else {
      setProgressValue(0);
    }
  }, [balance, skip]);

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg shadow-amber-500/5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 py-6">
        <CardHeader>
          <div className="flex flex-col items-center">
            <CardTitle className="text-center text-xl text-amber-800 dark:text-amber-200 font-bold mb-2">
              {balance !== null && balance !== undefined
                ? "Wallet Connected"
                : "Connect Wallet"}
            </CardTitle>
            <CardDescription className="text-center text-amber-700/80 dark:text-amber-300/80 max-w-sm">
              {balance !== null && balance !== undefined
                ? "Please verify you have enough SOL for the creation fee."
                : "Connect your wallet to get started."}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 max-w-lg mx-auto">
        <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-500/5 dark:to-orange-500/5 backdrop-blur-sm border border-amber-200/30 dark:border-amber-700/30">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 hidden sm:flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-amber-600 dark:text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-amber-700 dark:text-amber-300">
                  Creation Fee
                </div>
                <div className="text-base sm:text-2xl font-bold text-amber-800 dark:text-amber-200 font-mono">
                  {FEE_AMOUNT} SOL
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-2 mb-1">
                <div className="text-sm font-medium text-amber-700/80 dark:text-amber-300/80">
                  Balance
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refreshBalance}
                  disabled={loading}
                  className="h-6 w-6 p-0.5 text-amber-600/80 hover:text-amber-700 hover:bg-amber-100/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={cn("w-4 h-4", loading && "animate-spin")}
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0v2.433l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </div>
              <div className="font-mono text-xs sm:text-base font-medium text-amber-800/90 dark:text-amber-200/90">
                {loading ? (
                  <div className="animate-pulse text-amber-600/50 dark:text-amber-400/50">
                    0.0000 SOL
                  </div>
                ) : (
                  `${balance?.toFixed(4) ?? "0.0000"} SOL`
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <Progress
              value={progressValue}
              className="h-1.5 bg-amber-200 dark:bg-amber-900/50"
            />
            <div className="text-xs text-amber-600/70 dark:text-amber-400/70 text-right">
              {progressValue.toFixed(0)}% of required fee available
            </div>
          </div>
        </div>
      </div>

      {balance !== undefined && balance !== null && balance < 0.1 && (
        <div className="space-y-3">
          <Alert
            variant="destructive"
            className="bg-red-50/50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border-red-200/50 dark:border-red-800/30"
          >
            <AlertDescription className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              Insufficient balance for token creation fee ({FEE_AMOUNT} SOL)
            </AlertDescription>
          </Alert>
          <div className="p-4 rounded-lg bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30">
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">
              Need SOL?
            </h3>
            <p className="text-sm text-amber-700/80 dark:text-amber-300/80 mb-3">
              You can buy SOL from these trusted exchanges:
            </p>
            <div className="space-y-2">
              <a
                href="https://www.binance.com/how-to-buy/solana"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
                Binance
              </a>
              <a
                href="https://www.coinbase.com/price/solana"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
                Coinbase
              </a>
              <a
                href="https://www.kraken.com/learn/buy-solana-sol"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
                Kraken
              </a>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <CombinedButton
          FunctionalityButton={WalletDisconnectButton}
          props={{ variant: "outline" }}
          onClick={skip.reset}
        >
          Disconnect
        </CombinedButton>
        <Button
          onClick={handleNext}
          disabled={!balance || balance < 0.1 || loading}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
