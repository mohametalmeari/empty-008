import { useTokenForm } from "@/providers/token-form";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { FEE_AMOUNT } from "@/lib/solana-utils";

export const SubmitSection = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isWaitingWallet, setIsWaitingWallet] = useState(false);
  const {
    submitToken,
    handleBack,
    decimals,
    title,
    symbol,
    description,
    supply,
    logo,
    website,
    twitter,
    discord,
    handleNext,
  } = useTokenForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSubmitting && !isWaitingWallet) {
      setElapsedTime(0);
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isSubmitting, isWaitingWallet]);

  const handleSubmit = async () => {
    setIsWaitingWallet(true);
    try {
      const response = await submitToken(() => {
        setIsWaitingWallet(false);
        setIsSubmitting(true);
      });

      if (response) {
        handleNext();
      } else {
        setIsWaitingWallet(false);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Token creation failed:", error);
      setIsWaitingWallet(false);
      setIsSubmitting(false);
    }
  };

  const formatSupply = (supply: number) => {
    return new Intl.NumberFormat("en-US").format(supply);
  };

  const SocialLink = ({
    url,
    platform,
  }: {
    url?: string;
    platform: string;
  }) => {
    if (!url) return null;
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        {platform}
      </a>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            {logo ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden border">
                <Image
                  src={URL.createObjectURL(logo)}
                  alt="Token Logo"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                {symbol?.[0] || "?"}
              </div>
            )}
            <div>
              <span className="text-2xl">{title}</span>
              <span className="text-lg text-muted-foreground ml-2">
                {symbol && `(${symbol})`}
              </span>
            </div>
          </CardTitle>
          {description && (
            <CardDescription className="mt-2">{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Total Supply
                </h4>
                <p className="text-lg font-mono">{formatSupply(supply)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Decimals
                </h4>
                <p className="text-lg font-mono">{decimals}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                Social Links
              </h4>
              <div className="flex gap-4">
                {website || twitter || discord ? (
                  <>
                    <SocialLink url={website} platform="Website" />
                    <SocialLink url={twitter} platform="Twitter" />
                    <SocialLink url={discord} platform="Discord" />
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground/70">
                    No social links provided
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Confirmation</CardTitle>
          <CardDescription className="space-y-1">
            <p>
              Please review the token details carefully. This action cannot be
              undone.
            </p>
            <p className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Creating a token costs {FEE_AMOUNT} SOL
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || isWaitingWallet}
              className="flex items-center gap-2"
            >
              {isWaitingWallet && (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {isWaitingWallet
                ? "Confirm in Wallet..."
                : isSubmitting
                ? `Creating... (${elapsedTime}s)`
                : "Create Token"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
