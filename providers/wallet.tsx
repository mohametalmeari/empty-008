"use client";

import "@solana/wallet-adapter-react-ui/styles.css";
import {
  ConnectionProvider,
  WalletProvider as ReactWalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

// const endpoint = "https://api.devnet.solana.com";
const endpoint = "https://api.mainnet-beta.solana.com";
// const endpoint = "https://solana-mainnet.g.alchemy.com/v2/_tsdWAIlxFMDvFsArMnJa"

const wallets = [new PhantomWalletAdapter()];

interface Props {
  children: React.ReactNode;
}

export const WalletProvider = ({ children }: Props) => {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <ReactWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </ReactWalletProvider>
    </ConnectionProvider>
  );
};
