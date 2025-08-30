"use client";

import "@solana/wallet-adapter-react-ui/styles.css";
import {
  ConnectionProvider,
  WalletProvider as ReactWalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ENDPOINT } from "@/lib/solana-utils";

const wallets = [new PhantomWalletAdapter()];

interface Props {
  children: React.ReactNode;
}

export const WalletProvider = ({ children }: Props) => {
  return (
    <ConnectionProvider endpoint={ENDPOINT}>
      <ReactWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </ReactWalletProvider>
    </ConnectionProvider>
  );
};
