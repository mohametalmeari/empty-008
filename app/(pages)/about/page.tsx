export default function AboutPage() {
  return (
    <div className="container max-w-4xl mx-auto py-24 px-4">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent mb-8">
        About SolCrafter
      </h1>
      <div className="prose prose-amber max-w-none">
        <p className="text-lg text-amber-800/90 mb-6">
          SolCrafter is a cutting-edge platform designed to simplify token creation on the Solana blockchain. Our mission is to make blockchain technology accessible to everyone, regardless of their technical background.
        </p>
        <h2 className="text-2xl font-semibold text-amber-800 mt-8 mb-4">Our Vision</h2>
        <p className="text-amber-800/90 mb-6">
          We believe in a future where creating and managing digital assets is as simple as creating a social media profile. SolCrafter is built with this vision in mind, providing intuitive tools that empower creators, entrepreneurs, and communities.
        </p>
        <h2 className="text-2xl font-semibold text-amber-800 mt-8 mb-4">Why Choose SolCrafter?</h2>
        <ul className="list-disc pl-6 space-y-3 text-amber-800/90">
          <li>User-friendly interface designed for both beginners and experts</li>
          <li>Advanced security features to protect your assets</li>
          <li>Transparent pricing with no hidden fees</li>
          <li>Dedicated support team to help you succeed</li>
          <li>Regular updates and new features based on community feedback</li>
        </ul>
      </div>
    </div>
  );
}
