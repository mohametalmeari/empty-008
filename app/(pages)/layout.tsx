import { WalletProvider } from "@/providers/wallet";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-12 sm:pt-20 pb-8 sm:pb-16 px-2 sm:px-4 lg:px-8">
          <div className="relative min-h-[calc(100vh-8rem)] max-w-full sm:max-w-7xl mx-auto w-full">{children}</div>
        </main>
        <Footer />
      </div>
    </WalletProvider>
  );
}
