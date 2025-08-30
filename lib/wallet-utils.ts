import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FEE_AMOUNT } from "./solana-utils";

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

export const validateBalance = async ({
  feeAmount,
  userPublicKey,
  connection,
}: {
  feeAmount: number;
  userPublicKey: PublicKey;
  connection: Connection;
}) => {
  const userBalance = await connection.getBalance(userPublicKey);

  if (userBalance < feeAmount) {
    throw new Error(
      `Insufficient balance. You need at least ${FEE_AMOUNT} SOL but have ${(
        userBalance / LAMPORTS_PER_SOL
      ).toFixed(4)} SOL`
    );
  }
};
