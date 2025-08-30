export default function DocsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-24 px-4">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent mb-8">
        Documentation
      </h1>
      <div className="prose prose-amber max-w-none">
        <p className="text-lg text-amber-800/90 mb-8">
          Learn how to create and manage your tokens with our comprehensive guides and documentation.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">Getting Started</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-amber-200 bg-amber-50/50">
                <h3 className="font-medium text-amber-900 mb-2">1. Connect Your Wallet</h3>
                <p className="text-amber-800/90">
                  Click the &quot;Connect Wallet&quot; button and select your preferred Solana wallet.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-amber-200 bg-amber-50/50">
                <h3 className="font-medium text-amber-900 mb-2">2. Configure Token Details</h3>
                <p className="text-amber-800/90">
                  Enter your token&apos;s name, symbol, and initial supply.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-amber-200 bg-amber-50/50">
                <h3 className="font-medium text-amber-900 mb-2">3. Deploy Your Token</h3>
                <p className="text-amber-800/90">
                  Review your settings and click &quot;Create Token&quot; to deploy to the Solana blockchain.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">Advanced Features</h2>
            <ul className="list-disc pl-6 space-y-3 text-amber-800/90">
              <li>Token metadata management</li>
              <li>Supply control and minting options</li>
              <li>Token burning capabilities</li>
              <li>Transfer authority settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">Resources</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <a href="#" className="p-4 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-100/50 transition-colors">
                <h3 className="font-medium text-amber-900 mb-2">API Documentation</h3>
                <p className="text-sm text-amber-800/90">Detailed API reference for developers</p>
              </a>
              <a href="#" className="p-4 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-100/50 transition-colors">
                <h3 className="font-medium text-amber-900 mb-2">Video Tutorials</h3>
                <p className="text-sm text-amber-800/90">Step-by-step video guides</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
