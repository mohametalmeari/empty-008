import {
  IoRocket,
  IoShieldCheckmark,
  IoSpeedometer,
  IoWallet,
} from "react-icons/io5";

const features = [
  {
    name: "Easy Token Creation",
    description:
      "Create your token in minutes with our intuitive interface. No coding required – just fill in the details and launch.",
    icon: IoRocket,
  },
  {
    name: "Bank-Grade Security",
    description:
      "Enterprise-level security measures ensure your tokens and transactions are protected at all times.",
    icon: IoShieldCheckmark,
  },
  {
    name: "Lightning Fast",
    description:
      "Built on Solana for lightning-fast transactions and minimal fees. Launch your token instantly.",
    icon: IoSpeedometer,
  },
  {
    name: "Wallet Integration",
    description:
      "Seamless integration with popular Solana wallets. Connect and manage your tokens easily.",
    icon: IoWallet,
  },
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto py-24 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent mb-6">
          Platform Features
        </h1>
        <p className="text-lg text-amber-800/90 max-w-2xl mx-auto">
          Discover all the powerful features that make SolCrafter the perfect
          choice for creating and managing your Solana tokens.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
        {features.map((feature) => (
          <div key={feature.name} className="relative group">
            <div className="absolute -inset-px bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative flex gap-6 p-6 rounded-xl bg-white/80 hover:bg-white/90 backdrop-blur-sm border border-yellow-200 group-hover:border-yellow-300 transition-all duration-500">
              <div className="mt-1 flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-amber-900">
                  {feature.name}
                </h3>
                <p className="mt-3 text-amber-800/90">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
