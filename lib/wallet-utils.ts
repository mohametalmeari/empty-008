import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

interface BalanceResult {
  balance: number;
  error?: string;
}

export const fetchWalletBalance = async (
  connection: Connection,
  publicKey: PublicKey
): Promise<BalanceResult> => {
  try {
    const userPublicKey = new PublicKey(publicKey);
    const balanceInLamports = await connection.getBalance(userPublicKey);

    return { balance: balanceInLamports / LAMPORTS_PER_SOL };
  } catch (error) {
    console.error("Failed to get balance:", error);

    return {
      balance: NaN,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
