import { Card } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="container py-8 mx-auto">
      <Card className="p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground">
              Welcome to SolCrafter. By using our service, you agree to these
              terms. Please read them carefully.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Use of Service</h2>
            <p className="text-muted-foreground">
              SolCrafter provides tools for creating and managing tokens on the
              Solana blockchain. You must use these services responsibly and in
              accordance with all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. User Responsibilities
            </h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining the security of your wallet
              and private keys. Never share your private keys or seed phrases
              with anyone.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Limitations</h2>
            <p className="text-muted-foreground">
              Our services are provided &quot;as is&quot; without any
              warranties. We are not responsible for any losses that may occur
              while using our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Updates to Terms</h2>
            <p className="text-muted-foreground">
              We may update these terms from time to time. Continued use of our
              service after such changes constitutes acceptance of the new
              terms.
            </p>
          </section>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          Last updated: August 22, 2025
        </div>
      </Card>
    </div>
  );
}
