"use client";

import { Button } from "@/components/ui/button";
import { useBalance } from "@/hooks/use-balance";
import {
  WalletDisconnectButton,
  WalletModalButton,
} from "@solana/wallet-adapter-react-ui";

export default function Home() {
  const { balance, loading, publicKey, refreshBalance } = useBalance();

  return (
    <main className="min-h-screen flex flex-col gap-4 items-center justify-center">
      {publicKey ? <WalletDisconnectButton /> : <WalletModalButton />}
      {loading ? "Loading..." : balance}
      <Button onClick={refreshBalance}>Refresh</Button>
    </main>
  );
}
