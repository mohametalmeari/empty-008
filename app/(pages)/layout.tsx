import { WalletProvider } from "@/providers/wallet";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <WalletProvider>{children}</WalletProvider>;
}
