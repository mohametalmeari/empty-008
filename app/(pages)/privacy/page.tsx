import { Card } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="container py-8 mx-auto">
      <Card className="p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Information We Collect
            </h2>
            <p className="text-muted-foreground">
              We collect minimal information required for the functioning of the
              service. This includes wallet addresses and transaction data that
              is publicly available on the blockchain.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-muted-foreground">
              We use the collected information solely for providing and
              improving our services. We do not sell or share your personal
              information with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Data Storage</h2>
            <p className="text-muted-foreground">
              Your data is stored securely. Note that blockchain transactions
              are public by nature and will be visible on the Solana network.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Cookies</h2>
            <p className="text-muted-foreground">
              We use essential cookies to ensure the basic functionality of our
              website. These cookies do not track your browsing activity across
              other sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Your Rights</h2>
            <p className="text-muted-foreground">
              You have the right to access, correct, or delete your personal
              information. Contact us if you wish to exercise these rights.
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
