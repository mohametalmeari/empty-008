import { AlertTitle, AlertDescription, Alert } from "@/components/ui/alert";
import { useTokenForm } from "@/providers/token-form";
import { useConnection } from "@solana/wallet-adapter-react";

const getClusterParam = (endpoint: string) => {
  if (endpoint.includes("mainnet")) return "";
  return endpoint.includes("devnet") ? "?cluster=devnet" : "?cluster=testnet";
};

export const SuccessSection = () => {
  const shortAddress = (address: string, length: number = 4) =>
    address.length > length / 2
      ? `${address.slice(0, length)}...${address.slice(-length)}`
      : address;
  const {
    result,
    resetForm,
    title,
    symbol,
    description,
    supply,
    decimals,
    website,
    twitter,
    discord,
  } = useTokenForm();
  const { connection } = useConnection();
  const clusterParam = getClusterParam(connection.rpcEndpoint);

  if (!result) return null;

  return (
    <div className="mt-6 space-y-6">
      <Alert
        variant="default"
        className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left"
      >
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-6 w-full">
          <div className="relative mb-2 sm:mb-0">
            <div className="h-10 w-10 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-green-400 to-green-500 dark:from-green-500 dark:to-green-600 flex items-center justify-center shadow-lg shadow-green-500/20 dark:shadow-green-900/30">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <AlertTitle className="text-lg sm:text-2xl mb-2 text-green-800 dark:text-green-300">
              Token Created Successfully!
            </AlertTitle>
          </div>
        </div>
      </Alert>

      <div className="grid gap-4">
        {result.mintAddress && (
          <div className="flex items-center px-3 py-2 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/30">
            <span className="flex-shrink-0 flex items-center justify-center mr-2">
              <svg
                className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </span>
            
            <code className="font-mono text-sm text-blue-700 dark:text-blue-300 truncate block sm:hidden">
              {shortAddress(result.mintAddress)}
            </code>
            <code className="font-mono text-sm text-blue-700 dark:text-blue-300 truncate hidden sm:block">
              {shortAddress(result.mintAddress, 8)}
            </code>
            <div className="flex-1"></div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result.mintAddress);
              }}
              className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded text-blue-600 dark:text-blue-400 transition-colors flex-shrink-0"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
            </button>
          </div>
        )}

        
        <a
          href={`https://explorer.solana.com/address/${result.mintAddress}${clusterParam}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-black/20 hover:shadow-sm transition-all duration-200 border border-blue-100 dark:border-blue-900"
        >
          <span className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </span>
          <span className="font-medium">View on Explorer</span>
        </a>

        
        <a
          href="https://raydium.io/liquidity-pools/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-black/20 hover:shadow-sm transition-all duration-200 border border-blue-100 dark:border-blue-900"
        >
          <span className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </span>
          <span className="font-medium">Create Liquidity Pool</span>
        </a>

        
        <a
          href={`https://birdeye.so/token/${result.mintAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-black/20 hover:shadow-sm transition-all duration-200 border border-purple-100 dark:border-purple-900"
        >
          <span className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </span>
          <span className="font-medium">Track on Birdeye</span>
        </a>

        
        <button
          onClick={() => {
            const tokenDetails = {
              name: title,
              symbol: symbol,
              description: description,
              supply: supply,
              decimals: decimals,

              website: website || null,
              twitter: twitter || null,
              discord: discord || null,

              mintAddress: result.mintAddress,
              network: connection.rpcEndpoint.includes("mainnet")
                ? "mainnet"
                : connection.rpcEndpoint.includes("devnet")
                ? "devnet"
                : "testnet",

              createdAt: new Date().toISOString(),
              explorerUrl: `https://explorer.solana.com/address/${result.mintAddress}${clusterParam}`,
            };
            const blob = new Blob([JSON.stringify(tokenDetails, null, 2)], {
              type: "application/json",
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `token-details-${result.mintAddress?.slice(
              0,
              8
            )}.json`;
            a.click();
            window.URL.revokeObjectURL(url);
          }}
          className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-black/20 hover:shadow-sm transition-all duration-200 border border-blue-100 dark:border-blue-900 cursor-pointer"
        >
          <span className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </span>
          <span className="font-medium">Download Token Details</span>
        </button>
      </div>

      
      <div className="flex justify-center mt-8">
        <button
          onClick={resetForm}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg shadow-green-500/20 dark:shadow-green-900/30 transition-all duration-200 hover:scale-105"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Create Another Token
        </button>
      </div>
    </div>
  );
};
